import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modeBox", "playButton", "selectedMode", "modeDescription"];

  connect() {
    this.descriptions = {
      kanji: "Kanji mode allows you to practice individual kanji.<br>The classic mode!",
      story: "HEEHEE<br>HEEHEE"
    };
  }

  selectMode(event) {
    const selectedButton = event.currentTarget;

    if (selectedButton.classList.contains("active")) {
      selectedButton.classList.remove("active");
      this.selectedModeTarget.value = "";
      this.playButtonTarget.setAttribute("disabled", "true");
      this.modeDescriptionTarget.innerHTML = "Choose a mode!";
    } else {
      this.modeBoxTargets.forEach(btn => btn.classList.remove("active"));

      selectedButton.classList.add("active");

      const mode = selectedButton.dataset.mode;
      this.selectedModeTarget.value = mode;
      this.playButtonTarget.removeAttribute("disabled");

      this.modeDescriptionTarget.innerHTML = this.descriptions[mode];
    }
  }
}
