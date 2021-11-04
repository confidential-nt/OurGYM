import Modal from "./component/modal";

class Profile {
  constructor(Modal) {
    this.deleteAccountBtn = document.querySelector(".account_delete-btn");
    this.Modal = Modal;
  }

  run() {
    this.addProfileEvent();
  }

  addProfileEvent() {
    this.deleteAccountBtn.addEventListener(
      "click",
      this.handleDisplayModal.bind(this)
    );
  }

  handleDisplayModal(e) {
    if (!this.Modal.isDisplayed) {
      this.Modal.display();
    }
  }
}

const modal = new Modal();
const profile = new Profile(modal);
profile.run();
