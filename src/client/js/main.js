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

class Stats {
  today = new Date()
    .toLocaleString()
    .substr(0, 11)
    .split(".")
    .map((str) => {
      if (str < 10) {
        return `0${str.trim()}`;
      } else {
        return str.trim();
      }
    })
    .join("-");
  calendarToday = new Date();
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
        initialDate: this.calendarToday,
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

    if (!workData.length || !workData[0].exercises.length) {
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

    const isExrmetas = workData.find((el) => {
      return el.exercises.find((exer) => {
        return exer.exrmetas.length > 0;
      });
    });

    if (!isExrmetas) {
      detailContainer.innerHTML = "<li>아직 아무것도 없습니다.</li>";
      return;
    }

    detailContainer.innerHTML = workData
      .map((data) => {
        return data.exercises
          .map((el) => {
            return el.exrmetas
              .map((meta) => {
                return `<li><h5>${meta.exrmetaName}</h5><span>${
                  meta.exrmetaCount ? `${meta.exrmetaCount}회` : ""
                }</span><span> 기타: ${meta.exrmetaOther}</span></li>`;
              })
              .join("");
          })
          .join("");
      })
      .join("");
  }

  async run() {
    this.initialize();
    this.highlightToday();
    await this.getData();
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
    Stats.exerciseData = Stats.exerciseData.concat(result);
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
    } else if (time > 0 && time < this.timeScale.LOW) {
      return this.timeColor.VERY_LOW;
    } else {
      return "#fff";
    }
  }

  handlePageChange(e) {
    this.highlightToday();
    this.setStats();
  }
}

if (window.location.href.substr(30) === "stats") {
  console.log(123);
  const stats = new Stats();
}
