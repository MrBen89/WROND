import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["hint", "wrondarou"];

  connect() {
    this.clickable = false;
    setTimeout(() => {
      document.querySelector(".ask-wrondarou-btn").classList.remove("hidden");
      this.clickable = true;
    }, 5000);
  }

  appear() {
    if (!this.clickable) return;

    this.hintTarget.classList.add("show");
    // this.hintTarget.classList.style.transition = "opacity 1s";
  }
}
