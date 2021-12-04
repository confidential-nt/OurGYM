import "babel-polyfill";

class Home {
  date = new Date();
  year = parseInt(this.date.getFullYear());
  month = parseInt(this.date.getMonth() + 1);
  dateToday = parseInt(this.date.getDate());
  Today = `${this.year}. ${String(this.month).padStart(2, "0")}. ${String(
    this.dateToday
  ).padStart(2, "0")}`;

  //Paint current date
  currentDate = document.querySelector(".content_top");

  constructor() {
    this.paintCurrentDate();

    const exr_timer = document.getElementsByClassName("exr_timer");
    //timer 클릭되면 index 추출해서 exr_timer_index + time 만듦
    let index = 0;
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

    const changeTime = async () => {
      const Today = this.Today;
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
    
    //delete Exercise metas
    const exr_meta_btns = document.getElementsByClassName("exr_meta_btns");
    let indexMeta = 0;
    const deleteExrMeta = async () => {
      const idOfExrMeta = exr_meta_btns[indexMeta].id;
      index = idOfExrMeta.replace(/[^0-9]/g, "");
      try {
        await fetch("/api/timer/meta/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ index, indexMeta }),
        });
      } catch (error) {
        console.log(error);
      }
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
  }

  paintCurrentDate() {
    this.currentDate.innerText = this.Today;
  }
}

new Home();
