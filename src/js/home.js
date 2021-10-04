const timer = document.querySelector('.content timer')
const timerTime = timer.querySelector('.content_timer_time')
const timerStartBtn = timer.querySelector('#start_button')
const timerPauseBtn = timer.querySelector('#pause_button')

function startTimer(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0")
    const minutes = String(date.getMinutes()).padStart(2,"0")
    const seconds = String(date.getSeconds()).padStart(2,"0")

    timerTime.innerText = `${hours} : ${minutes} : ${seconds}`
}

function paintTime(event){
    console.dir(event)
    startTimer()
    setInterval(startTimer, 1000)
}
timerStartBtn.addEventListener('click', paintTime)