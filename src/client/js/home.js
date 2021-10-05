const timer = document.querySelector(".content timer")
const timerTime = document.querySelector(".content_timer_time")
const timerBtn = document.querySelector("#timer_button")

let run =0;

function startTimer(clickedTime){
    const date = new Date();
    const sumOfTime = parseInt((date.getTime()-clickedTime)/1000)
    const hours = parseInt(sumOfTime/3600)
    const minutes = parseInt((sumOfTime%3600)/60)
    const seconds = parseInt((sumOfTime%3600)%60)
    
    timerTime.innerText = `${String(hours).padStart(2,"0")} : ${String(minutes).padStart(2,"0")} : ${String(seconds).padStart(2,"0")}`
}

function paintTime(event){
    let timerInterval
    if(timerBtn.innerText=="정지"){
        timerBtn.innerText="재개"
        clearInterval(timerInterval);
    }else{
        timerBtn.innerText="정지"
        const date = new Date();
        const clickedTime = date.getTime();
        timerInterval = setInterval(function(){
            startTimer(clickedTime)
            }, 1000)
        console.log(timerInterval);
    }
}

timerBtn.addEventListener('click', paintTime)
