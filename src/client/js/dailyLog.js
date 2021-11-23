import OtherModal from "./component/otherModal";

class DailyLog {
  addBtn = document.querySelector(".add_dailyLog");

  constructor() {
    this.addBtn.addEventListener("click", this.handleAddBtn.bind(this));
  }

  handleAddBtn(e) {
    const modal =
      new OtherModal(`<form method="post" enctype="multipart/form-data">
        <label for="image"> 올릴 이미지 </label>
        <input type="file" id="image" name="image" accept="image/*" />
        <label for="content"> 오늘의 일지 </label>
        <textarea id="content" name="content" /></textarea>
        <input type="submit" value="완료"/>
    </form>`);
  }
}

new DailyLog();
