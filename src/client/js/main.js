import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import "../scss/styles.css";

const tmp = [
  { date: "2021-09-21", time: 4000 },
  { date: "2021-10-23", time: 2000 },
  { date: "2021-11-08", time: 1000 },
  { date: "2021-11-09", time: 1000 * 60 * 60 },
  { date: "2021-11-11", time: 1000 * 60 * 120 },
];

const color = {};

class Stats {
  today = new Date().toISOString().substr(0, 10);
  color = ["red", "orange", "yellow"];
  timeScale = {};
  todayCell;
  monthBtns;

  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      const calendarEl = document.getElementById("calendar");

      const calendar = new Calendar(calendarEl, {
        initialDate: this.today,
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
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

      if (el.time > 1000 * 60 * 60) {
        cell.style.backgroundColor = "red";
      } else if (el.time > 1000 * 60) {
        cell.style.backgroundColor = "orange";
      } else {
        cell.style.backgroundColor = "yellow";
      }
    }
  }

  getColor(time) {}

  handlePageChange(e) {
    this.highlightToday();
    this.setStats();
  }

  showDetailLog() {}
}

if (window.location.href.substr(22) === "stats") {
  const stats = new Stats();
}
