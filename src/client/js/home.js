// import User from "../models/User"; 이거 쓰면 안됨

const id = req.session.user._id;
// const user = await User.findById(id); await은 반드시 async 안에
const user = "";
const date = new Date();
const year = parseInt(date.getFullYear());
const month = parseInt(date.getMonth() + 1);
const dateToday = parseInt(date.getDate());

let sumOfTime;

//Paint current date
const currentDate = document.querySelector(".content_top");

function paintCurrentDate() {
  currentDate.innerText = `${year}. ${String(month).padStart(2, "0")}. ${String(
    dateToday
  ).padStart(2, "0")}`;
}
paintCurrentDate();

//--------------
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = async (event) => {
  const textarea = form.querySelector("textarea");

  event.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  window.location.reload();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
//------------------------------

//Timer
const exr_timer = document.getElementsByClassName("exr_timer");
//timer 클릭되면 index 추출해서 exr_timer_index + time 만듦
let index = 1;

// change start & pause
const changeValues = async () => {
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
    clearInterval(timerInterval);
    //update mongo
    await fetch(``, {
      method: "POST",
    });
    exr_timer_index.innerHTML = "▶";
  }
};

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
