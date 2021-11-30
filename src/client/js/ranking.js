class Ranking {
  rankingItems;
  constructor() {
    this.rankingItems = document.querySelectorAll(".rank_li");
    this.formattingRankingTime();
  }

  formattingRankingTime() {
    this.rankingItems.forEach((item) => {
      const sec = parseInt(item.dataset.sec, 10);
      console.log(sec);
    });
  }
}

new Ranking();
