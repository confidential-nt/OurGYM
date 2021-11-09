import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import "../scss/styles.css";

class Stats {
  today;

  constructor() {
    this.today = new Date().toISOString().substr(0, 10);

    document.addEventListener("DOMContentLoaded", () => {
      const calendarEl = document.getElementById("calendar");

      const calendar = new Calendar(calendarEl, {
        initialDate: this.today,
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        events: [
          {
            start: "2014-11-10T10:00:00",
            end: "2014-11-10T16:00:00",
            className: "todayCell",
          },
        ],
      });

      calendar.render();
      this.run();
    });
  }

  run() {
    this.highlightToday();
  }

  highlightToday() {
    const todayCell = document.querySelector(`td[data-date="${this.today}"]`);
    todayCell.style.border = "4px solid red";
  }
}

const stats = new Stats();
