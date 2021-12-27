import Modal from "./component/modal";

class Profile {
  deleteAccountBtn = document.querySelector(".account_delete-btn");
  refuseBtn;
  acceptBtn;

  constructor() {
    this.deleteAccountBtn.addEventListener(
      "click",
      this.handleDeleteAccount.bind(this)
    );
  }

  handleDeleteAccount(e) {
    const modal = new Modal(
      `<p class="modal-paragraph">정말 계정을 삭제하시겠습니까?</p><div class="modal-btn"><button class="accept-btn">예</button><button class="refuse-btn">아니오</button></div>`
    );

    this.refuseBtn = document.querySelector(".refuse-btn");
    this.acceptBtn = document.querySelector(".accept-btn");

    this.refuseBtn.addEventListener("click", (e) => {
      modal.hide();
    });
    this.acceptBtn.addEventListener("click", (e) => {
      modal.hide();
      const otherModal = new Modal(
        `<form method="post" action="/users/delete"><input type="password" name="password" placeholder="패스워드를 입력하세요."/><input type="submit" value="삭제"/></form>`
      );
    });
  }
}

new Profile();

export default Profile;
