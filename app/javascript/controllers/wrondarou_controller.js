import { KanjiController } from "@hotwired/stimulus";

export default class extends KanjiController {
  static targets = ["hint"];

  toggle() {
    this.hintTarget.style.display =
      this.hintTarget.style.display === "none" ? "block" : "none";
  }
}
