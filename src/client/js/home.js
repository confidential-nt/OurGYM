const timer = document.querySelector(".content timer")
const timerTime = document.querySelector(".content_timer_time")
const timerStartBtn = document.querySelector("#start_button")
const timerPauseBtn = document.querySelector("#pause_button")

function startTimer(clickedTime){
    const date = new Date();
    const sumOfTime = parseInt((date.getTime()-clickedTime)/1000)
    console.log(sumOfTime);
    const hours = parseInt(sumOfTime/3600)
    const minutes = parseInt((sumOfTime%3600)/60)
    const seconds = parseInt((sumOfTime%3600)%60)
    
    timerTime.innerText = `${String(hours).padStart(2,"0")} : ${String(minutes).padStart(2,"0")} : ${String(seconds).padStart(2,"0")}`
}

function paintTime(event){
    const date = new Date();
    const clickedTime = date.getTime();
    setInterval(function(){
        startTimer(clickedTime)
        }, 1000)
}
timerStartBtn.addEventListener('click', paintTime)