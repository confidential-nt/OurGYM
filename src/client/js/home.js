import User from "../models/User";

const id = req.session.user._id;
const user = await User.findById(id);

const updateExrtime = async (req, res)=>{
  await User.findByIdAndUpdate(_id, { exercises: { exrtime } } );
}

//Paint current date
const currentDate = document.querySelector(".content_top");

function paintCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateToday = date.getDate();
  currentDate.innerText = `${String(year)}. ${String(month).padStart(
    2,
    "0"
  )}. ${String(dateToday).padStart(2, "0")}`;
}
paintCurrentDate();

//Timer
const exr_timer = document.getElementsByClassName("exr_timer");
//timer 클릭되면 index 추출해서 exr_timer_index + time 만듦
let index = 1;

// change start & pause
function changeValues(event) {
  const exr_timer_index = document.getElementById(`exr_timer_${index}`);
  let timerInterval;

  if (exr_timer_index.textContent === "▶") {
    exr_timer_index.innerHTML = "| |";
    const date = new Date();
    const clickedTime = date.getTime();
    timerInterval = setInterval(function () {
      changeTime(clickedTime);
    }, 1000);
  } else {
    //update mongo
    exr_timer_index.innerHTML = "▶";
    clearInterval(timerInterval);
  }
}

//change value of time
function changeTime(clickedTime) {
  const exr_timer_time = document.getElementById(`exr_timer_time_${index}`);
  const date = new Date();
  const sumOfTime = parseInt((date.getTime() - clickedTime) / 1000);
  updateExrtime();
  console.log(sumOfTime);
  console.log(typeof sumOfTime);
  const hours = parseInt(sumOfTime / 3600);
  const minutes = parseInt((sumOfTime % 3600) / 60);
  const seconds = parseInt((sumOfTime % 3600) % 60);

  exr_timer_time.innerText = `${String(hours).padStart(2, "0")} : ${String(
    minutes
  ).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
}

for (var i = 0; i < exr_timer.length; i++) {
  (function (idx) {
    exr_timer[idx].onclick = function () {
      index = idx + 1;
      changeValues();
    };
  })(i);
}
