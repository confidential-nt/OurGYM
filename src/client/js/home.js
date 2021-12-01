import "babel-polyfill";

const date = new Date();
const year = parseInt(date.getFullYear());
const month = parseInt(date.getMonth() + 1);
const dateToday = parseInt(date.getDate());
const Today = `${year}. ${String(month).padStart(2, "0")}. ${String(
  dateToday
).padStart(2, "0")}`;

//Paint current date
const currentDate = document.querySelector(".content_top");

function paintCurrentDate() {
  currentDate.innerText = Today;
}
paintCurrentDate();

//Paint exr time
// const paintExrTime = (text) => {
//   const newComment = document.createElement("li");
//   newComment.className = "video__comment";
//   const icon = document.createElement("i");
//   icon.className = "fas fa-comment";
//   const span = document.createElement("span");
//   span.innerText = ` ${text}`;
//   newComment.appendChild(icon);
//   newComment.appendChild(span);
//   videoComments.prepend(newComment);
// };

//Timer
const exr_timer = document.getElementsByClassName("exr_timer");
//timer 클릭되면 index 추출해서 exr_timer_index + time 만듦
let index = 0;
let exrTotal = 0;
let timerInterval = 0;

// change start & pause
const changeValues = () => {
  const exr_timer_index = document.getElementById(`exr_timer_${index}`);
  if (exr_timer_index.textContent === "▶") {
    exr_timer_index.innerHTML = "| |";
    timerInterval = setInterval(function () {
      changeTime();
    }, 1000);
  } else {
    clearInterval(timerInterval);
    exr_timer_index.innerHTML = "▶";
  }
};

//change value of time
const changeTime = async () => {
  try {
    await fetch("/api/timer/time", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index, Today }),
    });
  } catch (error) {
    console.log(error);
  }
};

//click 된 ▶️요소 index 추출
for (var i = 0; i < exr_timer.length; i++) {
  (function (idx) {
    exr_timer[idx].onclick = function () {
      index = idx;
      changeValues();
    };
  })(i);
}

//delet Exercise
const exr_timer_btns = document.getElementsByClassName("exr_timer_btns");

const deleteExr = async () => {
  try {
    await fetch("/api/timer/time/remove", {
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

//click 된 수정 삭제요소 index 추출
for (var i = 0; i < exr_timer_btns.length; i++) {
  (function (idx) {
    exr_timer_btns[idx].onclick = function () {
      index = idx;
      deleteExr();
    };
  })(i);
}

//delet Exercise metas
const exr_meta_btns = document.getElementsByClassName("exr_meta_btns");
let indexMeta = 0;
const deleteExrMeta = async () => {
  const idOfExrMeta = exr_meta_btns.id;
  console.log(idOfExrMeta);
  // index = idOfExrMeta.replace(/[^0-9]/g, "");
  // console.log(index);
  // try {
  //   await fetch("/api/timer/meta/remove", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ index, indexMeta }),
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

//click 된 수정 삭제요소 index 추출
for (var i = 0; i < exr_meta_btns.length; i++) {
  (function (idx) {
    exr_meta_btns[idx].onclick = function () {
      indexMeta = idx;
      deleteExrMeta();
    };
  })(i);
}
