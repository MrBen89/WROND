import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["button", "modeDescription", "selectedMode", "playButton"];

  connect() {
    console.log("Mode Selector Controller Connected!");
    this.playButtonTarget.disabled = true; // Disable play button initially
  }

  setMode(event) {
    const mode = event.target.dataset.mode;
    const isActive = event.target.classList.contains("active");
    let target = document.querySelector(`[data-mode="${mode}"]`);

    if (isActive) {
      target.classList.remove("active");
      this.selectedModeTarget.value = "";
      this.playButtonTarget.disabled = true;
      this.modeDescriptionTarget.innerHTML = "Choose a mode!";
    } else {
      this.buttonTargets.forEach((button) => button.classList.remove("active"));
      target.classList.add("active");
      this.selectedModeTarget.value = mode;
      this.playButtonTarget.disabled = false;

      const descriptions = {
        kanji: "Kanji mode allows you to practice individual kanji.<br>The classic mode!",
        story: "Try and practice the kanji you've learnt by making<br>SENTENCES!"
      };
      this.modeDescriptionTarget.innerHTML = descriptions[mode];
    }
  }

  toggleTutorial() {
    const tutorialContent = document.getElementById("tutorial-content");
    const overlay = document.getElementById("overlay");

    tutorialContent.classList.toggle("active"); // Slide in/out
    overlay.classList.toggle("active"); // Show/hide overlay
  }
}
