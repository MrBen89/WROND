// app/javascript/controllers/mode_selector_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["button", "modeDescription", "selectedMode", "playButton"];

  connect() {
    console.log("Mode Selector Controller Connected!");
    this.playButtonTarget.disabled = true; // Disable play button initially
  }

  setMode(event) {
    console.log(event);
    const mode = event.target.dataset.mode;
    console.log(mode);
    const isActive = event.target.classList.contains("active");
    let target = document.querySelector(`[data-mode="${mode}"]`);
    console.log(target);

    // If the mode is already active, remove it
    if (isActive) {
      target.classList.remove("active");
      this.selectedModeTarget.value = "";
      this.playButtonTarget.disabled = true;
      this.modeDescriptionTarget.innerHTML = "Choose a mode!";
    } else {
      // Deactivate all other buttons and activate the clicked one
      this.buttonTargets.forEach((button) => button.classList.remove("active"));
      target.classList.add("active");
      this.selectedModeTarget.value = mode;

      // Enable the play button
      this.playButtonTarget.disabled = false;

      // Update the mode description
      const descriptions = {
        kanji: "Kanji mode allows you to practice individual kanji.<br>The classic mode!",
        story: "Try and practice the kanji you've learnt by making<br>SENTENCES!"
      };
      this.modeDescriptionTarget.innerHTML = descriptions[mode];
    }
  }
  toggleTutorial() {
    const tutorialContent = document.getElementById("tutorial-content");
    tutorialContent.classList.toggle("active"); // Toggle the active class to slide in/out
  }
}
