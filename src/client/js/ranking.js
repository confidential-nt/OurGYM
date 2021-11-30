import Time from "./time";

class Ranking {
  rankingItems;
  constructor() {
    this.rankingItems = document.querySelectorAll(".rank_li");
    this.formattingRankingTime();
  }

  formattingRankingTime() {
    this.rankingItems.forEach((item) => {
      const sec = parseInt(item.dataset.sec, 10);
      const formattedTime = Time.makeTimeString(Time.timeFormatter(sec));

      const userTime = item.querySelector(".user_time");
      userTime.innerText = formattedTime;
    });
  }
}

new Ranking();
