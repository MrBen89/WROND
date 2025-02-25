import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["hint"];

  connect() {
  setTimeout(() => {
    this.hintTarget.classList.remove("hidden");
  }, 5000);
  }

  toggle() {
    this.hintTarget.classList.toggle("d-none");
  }
}
