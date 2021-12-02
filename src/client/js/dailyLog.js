import Modal from "./component/modal";
import { async } from "regenerator-runtime";
class DailyLog {
  addBtn = document.querySelector(".add_dailyLog");
  itemsContainer = document.querySelector(".dailyLog_items");
  ITEM_MODIFY_BTN = "modifyBtn";

  constructor() {
    this.addBtn.addEventListener("click", this.handleAddBtn.bind(this));
    this.itemsContainer.addEventListener(
      "click",
      this.handleClickItem.bind(this)
    );
    this.itemsContainer.addEventListener(
      "click",
      this.handleEditBtn.bind(this)
    );
  }

  handleAddBtn(e) {
    const modal = new Modal(`<form method="post" enctype="multipart/form-data">
        <label for="image"> 올릴 이미지 </label>
        <input type="file" id="image" name="image" accept="image/*" />
        <label for="content"> 오늘의 일지 </label>
        <textarea id="content" name="content" /></textarea>
        <input type="submit" value="완료"/>
    </form>`);
  }

  handleClickItem(e) {
    if (e.target.tagName !== "HEADER") return;

    const targetContent =
      e.target.parentNode.querySelector(".dailyLog__detail");

    targetContent.classList.toggle("hide");
  }

  handleEditBtn(e) {
    if (e.target.tagName !== "BUTTON") return;

    const li = e.target.parentNode.parentNode;
    const id = li.dataset.id;

    const modal = new Modal(`<div>
      <a href="/users/daily-log/${id}/delete">삭제</a>
      <button class="${this.ITEM_MODIFY_BTN}">수정</button>
    </div>`);

    const modifyBtn = document.querySelector(`.${this.ITEM_MODIFY_BTN}`);

    let result;

    modifyBtn.addEventListener("click", async () => {
      const logInfo = await fetch(`/api/daily-log/${id}`, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      result = await logInfo.json();

      modal.hide();

      const otherModal =
        new Modal(`<form action="/users/daily-log/${id}/edit" method="post" enctype="multipart/form-data">
      <label for="image"> 올릴 이미지 </label>
      <input type="file" id="image" name="image" accept="image/*" />
      <label for="content"> 오늘의 일지 </label>
      <textarea id="content" name="content"/>${result.content}</textarea>
      <input type="submit" value="완료"/>
  </form>`);
    });

    // modifyBtn.removeEventListener("click", )
  }
}

new DailyLog();
