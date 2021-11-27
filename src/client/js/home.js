// const id = req.session.user._id;
// const user = "";
import "babel-polyfill";

const date = new Date();
const year = parseInt(date.getFullYear());
const month = parseInt(date.getMonth() + 1);
const dateToday = parseInt(date.getDate());

let sumOfTime = 0;

//Paint current date
const currentDate = document.querySelector(".content_top");

function paintCurrentDate() {
  currentDate.innerText = `${year}. ${String(month).padStart(2, "0")}. ${String(
    dateToday
  ).padStart(2, "0")}`;
}
paintCurrentDate();


//Timer
const exr_timer = document.getElementsByClassName("exr_timer");
//timer 클릭되면 index 추출해서 exr_timer_index + time 만듦
let index = 0;

// change start & pause
const changeValues = () => {
  const exr_timer_index = document.getElementById(`exr_timer_${index}`);
  let timerInterval;

  if (exr_timer_index.textContent === "▶") {
    console.log("됨??????????????");
    exr_timer_index.innerHTML = "| |";
    timerInterval = setInterval(function () {
      changeTime();
    }, 1000);
  } else {
    // clearInterval(timerInterval);
    //update mongo
    // await fetch(``, {
    //   method: "POST",
    // });
    exr_timer_index.innerHTML = "▶";
  }
};

//change value of time
const changeTime = async () => {
  try {
    // console.log(JSON.stringify({ index }));
    await fetch("/api/timer/time", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index }),
    });
  } catch (error) {
    console.log(error);
  }
};

for (var i = 0; i < exr_timer.length; i++) {
  (function (idx) {
    exr_timer[idx].onclick = function () {
      index = idx;
      changeValues();
    };
  })(i);
}
