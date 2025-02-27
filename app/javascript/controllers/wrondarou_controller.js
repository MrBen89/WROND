import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["hint"];

  connect() {
  setTimeout(() => {
    document.querySelector(".game-gif-bottom").addEventListener("click", this.toggle.bind(this));
    document.querySelector(".ask-wrondarou-btn").classList.remove("hidden");
  }, 5000);
  }

  toggle() {
    document.querySelector(".words-of-wisdom").classList.remove("hidden");
  }
}
