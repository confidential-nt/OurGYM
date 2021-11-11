import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import "../scss/styles.css";

const tmp = [
  { date: "2021-09-21", time: 4000, id: "1131" },
  { date: "2021-10-23", time: 2000 },
  { date: "2021-11-08", time: 1000 },
  { date: "2021-11-09", time: 1000 * 60 * 60 },
  { date: "2021-11-11", time: 1000 * 60 * 120 },
];

const tmp2 = [{ weight: 20, time: 4000, count: 30, id: "1131" }];

class Stats {
  today = new Date().toISOString().substr(0, 10);
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
        },
      });

      calendar.render();
      this.run();
    });
  }

  run() {
    this.initialize();
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

    this.cellContainer = document.querySelector("table");
    this.cellContainer.addEventListener("click", this.showDetailLog.bind(this));
  }

  highlightToday() {
    this.todayCell = document.querySelector(`td[data-date="${this.today}"]`);

    if (!this.todayCell) return;

    this.todayCell.classList.add("highlightCell");
  }

  setStats() {
    for (let el of tmp) {
      const cell = document.querySelector(`td[data-date="${el.date}"]`);

      if (!cell) continue;

      cell.style.cursor = "pointer";

      cell.style.backgroundColor = this.getColor(el.time);
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

  showDetailLog(e) {
    if (e.target.tagName !== "DIV") return;
    console.log(e.target.parentNode);
  }
}

if (window.location.href.substr(22) === "stats") {
  const stats = new Stats();
}
