const fs = require ('fs');
const DBName = require('DBName');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');

$(function(){
    $('#userPw').keyup(function(){
      $('#chkNotice').html('');
    });

    $('#userPwChk').keyup(function(){

        if($('#userPw').val() != $('#userPwChk').val()){
          $('#chkNotice').html('비밀번호 일치하지 않음<br><br>');
          $('#chkNotice').attr('color', '#f82a2aa3');
        } else{
          $('#chkNotice').html('비밀번호 일치함<br><br>');
          $('#chkNotice').attr('color', '#199894b3');
        }

    });
});

const app = express();

const user = DBName.createConnection({
    name : 'kimyujeong',
    password : 'rkwhr8497!',
    database : 'OurGym',

}); //(DBName 데이터 베이스 연결설정 -> 임의설정)

app.use(express.static(path.join(__dirname,'/pulic')));

app.set('views', __dirname + '\\views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    encoding: 'blackzat', 
    resave: false,
    saveUninitialized: true,
    store : new FileStore()
}));

// 페이지
app.get('/', (req,res)=>{
    console.log('페이지 작동');
    console.log(req.session);
    
    if(req.session.is_logined == true) {
        res.render('index',{
            is_logined : req.session.is_logined,
            name : req.session.name
        });
    } else {
        res.render('index', {
            is_logined : false
        });
    }
});



app.get('/register',(req,res)=> {
    console.log('회원가입 페이지');
    res.render('register');
});

app.post('/register',(req,res)=>{
    console.log('회원가입 하는 중입니다!!!');
    const body = req.body;
    const id = body.id;
    const pw = body.pw;
    const pwcheck = body.pwcheck;
    const nickname = body.nickname;
    const email = body.email;
    const mainexercise = body.mainexercise;

    user.query('select * from userdata where id=?',[id],(err,data)=>{
        if(data.length == 0) {
            console.log('회원가입 성공!');
            user.query('insert into userdata(id, nickname, email, mainexercise, pw, pwcheck) values(?,?,?,?)', [
                id, nickname, email, mainexercise, pw, pwcheck
            ]);
            res.redirect('/');
        }else{
            console.log('회원가입 실패!!!!!');
            res.send('<script>alert("회원가입 실패!!!");</script>');
            res.redirect('/login');
        }
    });
});



app.listen(3000,()=>{
    console.log('3000 port running...');
});