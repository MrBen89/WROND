import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["hint"];

  connect() {
console.log("It works!");
  }

  toggle() {
    this.hintTarget.classList.toggle("d-none");
  }
}
