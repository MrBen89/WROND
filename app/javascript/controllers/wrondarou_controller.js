import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["hint", "wrondarou", "button"];

  connect() {
    console.log("connected");
    this.clickable = false;
    setTimeout(() => {
      document.querySelector(".ask-wrondarou-btn").classList.remove("hidden");
      this.clickable = true;
    }, 5000);
  }

  appear() {
    console.log("clicked")
    if (!this.clickable) return;
    document.getElementById("click_me").innerText = ""
    this.hintTarget.classList.add("show");
    // this.hintTarget.classList.style.transition = "opacity 1s";
  }

  swoosh() {
    this.buttonTarget.classList.add("swoosh")
  }
}
