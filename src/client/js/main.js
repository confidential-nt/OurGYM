import img from "../../../images/blankprofile.png";
import svg from "../../../images/podium.svg";

import { Calendar, formatDate } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Time from "./time.js";

import { async } from "regenerator-runtime";

import "../scss/styles.css";

const tmp = [
  { date: "2021-09-21", name: "눈깜빡이기", time: 4000, id: "1131" },
  { date: "2021-10-23", name: "숨쉬기", time: 2000, id: "1234" },
  { date: "2021-11-08", name: "잠자기", time: 1000, id: "4567" },
  { date: "2021-11-09", name: "살아있기", time: 1000 * 60 * 60, id: "7899" },
  { date: "2021-11-11", name: "밥먹기", time: 1000 * 60 * 120, id: "3553" },
];

// 시간 제대로 합해서
// 시간 형식 제대로 나타내기
// 아마 sumTime class 만들어야할듯>

const tmp2 = [
  { date: "2021-09-21", name: "눈깜빡이기", weight: 20, count: 30, id: "1131" },
  { date: "2021-10-23", name: "숨쉬기", weight: 10, count: 16, id: "1234" },
  { date: "2021-11-08", name: "잠자기", weight: 15, count: 26, id: "4567" },
  {
    date: "2021-11-09",
    name: "살아있기",
    weight: 15,
    count: 30,
    id: "7899",
  },
  {
    date: "2021-11-11",
    name: "밥먹기",
    weight: 20,
    count: 20,
    id: "3553",
  },
];

class Stats {
  today = new Date()
    .toLocaleString()
    .substr(0, 12)
    .split(".")
    .map((str) => str.trim())
    .join("-");

  timeColor = {
    VERY_HIGH: "#82fa11",
    HIGH: "#b2f573",
    MIDDLE: "#c6f797",
    LOW: "#dbfabe",
    VERY_LOW: "#e8fcd4",
  };
  timeScale = {
    VERY_HIGH: 1000 * 60 * 120,
    HIGH: 1000 * 60 * 90,
    MIDDLE: 1000 * 60 * 60,
    LOW: 1000 * 60 * 30,
  };
  todayCell;
  monthBtns;
  cellContainer;
  selectedCell;
  static exerciseData = [];

  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      const calendarEl = document.getElementById("calendar");

      const calendar = new Calendar(calendarEl, {
        initialDate: this.today,
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dateClick: function (info) {
          if (this.selectedCell)
            this.selectedCell.classList.remove("selectedCell");
          this.selectedCell = info.dayEl;
          this.selectedCell.classList.add("selectedCell");
          Stats.showDetailLog(this.selectedCell);
        },
      });
      calendar.render();
      this.run();
    });
  }

  static showDetailLog(cell) {
    const mainContainer = document.querySelector(".main-exercise ul");
    const detailContainer = document.querySelector(".detail-exercise ul");

    const curtain = document.querySelector(".log-container .curtain");

    curtain.style.display = "none";

    const date = cell.dataset.date;

    const workData = Stats.exerciseData.filter((data) => {
      const fomattedDate = data.date
        .split(".")
        .map((el) => el.trim())
        .join("-");
      return fomattedDate === date;
    });
    const detailData = tmp2.filter((data) => data.date === date);

    if (!workData.length) {
      mainContainer.innerHTML = "<li>아직 아무것도 없습니다.</li>";
      detailContainer.innerHTML = "<li>아직 아무것도 없습니다.</li>";
      return;
    }

    mainContainer.innerHTML = workData
      .map((data) => {
        return data.exercises
          .map((el) => {
            const timeobj = Time.timeFormatter(el.exrtime);
            const hour = timeobj.hour;
            const min = timeobj.min;
            const sec = timeobj.sec;

            return `<li><h5>${el.exrname}</h5><span>${
              hour < 10 ? `0${hour}` : hour
            }:${min < 10 ? `0${min}` : min}:${
              sec < 10 ? `0${sec}` : sec
            }</span></li>`;
          })
          .join("");
      })
      .join("");

    detailContainer.innerHTML = detailData
      .map(
        (data) =>
          `<li><h5>${data.name}</h5><span>${data.weight}kg</span><span>${data.count}회</span></li>`
      )
      .join("");
  }

  async run() {
    this.initialize();
    await this.getData();
    this.highlightToday();
    this.setStats();
  }

  initialize() {
    this.todayCell = document.querySelector(`td[data-date="${this.today}"]`);
    this.todayCell.style.backgroundColor = "transparent";

    this.monthBtns = document.querySelectorAll("[title*='month']");
    this.monthBtns.forEach((btn) => {
      btn.addEventListener("click", this.handlePageChange.bind(this));
    });
  }

  async getData() {
    let result;

    const exerInfo = await fetch(`/api/exercise/data`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    result = await exerInfo.json();

    Stats.exerciseData.push(result);
  }

  highlightToday() {
    this.todayCell = document.querySelector(`td[data-date="${this.today}"]`);

    if (!this.todayCell) return;

    this.todayCell.style.backgroundColor = "transparent";

    this.todayCell.classList.add("highlightCell");
  }

  setStats() {
    for (let el of Stats.exerciseData) {
      const date = el.date
        .split(".")
        .map((el) => el.trim())
        .join("-");

      const cell = document.querySelector(`td[data-date="${date}"]`);

      if (!cell) continue;

      // const timeSum = Time.sumTime(el.date);

      cell.style.backgroundColor = this.getColor(el.total * 1000);
    }
  }

  getColor(time) {
    if (time >= this.timeScale.VERY_HIGH) {
      return this.timeColor.VERY_HIGH;
    } else if (time >= this.timeScale.HIGH) {
      return this.timeColor.HIGH;
    } else if (time >= this.timeScale.MIDDLE) {
      return this.timeColor.MIDDLE;
    } else if (time >= this.timeScale.LOW) {
      return this.timeColor.LOW;
    } else {
      return this.timeColor.VERY_LOW;
    }
  }

  handlePageChange(e) {
    this.highlightToday();
    this.setStats();
  }
}

if (window.location.href.substr(22) === "stats") {
  const stats = new Stats();
}
