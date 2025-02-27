import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["button", "modeDescription", "selectedMode", "playButton"];

  connect() {
    console.log("Mode Selector Controller Connected!");
    this.playButtonTarget.disabled = true; // Disable play button initially
    this.startKanjiRain(); // Start kanji rain
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

  startKanjiRain() {
    const kanjiContainer = document.querySelector(".kanji-rain-container");
    const kanjiList = ["漢", "字", "学", "習", "楽", "愛", "心", "友"]; // Cute kanji selection

    setInterval(() => {
      const kanji = document.createElement("span");
      kanji.innerText = kanjiList[Math.floor(Math.random() * kanjiList.length)];
      kanji.classList.add("kanji");

      // Random position and animation speed
      kanji.style.left = `${Math.random() * 100}vw`;
      kanji.style.animationDuration = `${3 + Math.random() * 3}s`; // Slower fall (3-6 sec)
      kanji.style.fontSize = `${20 + Math.random() * 10}px`; // Varying sizes
      kanji.style.opacity = `${0.5 + Math.random() * 0.5}`; // Soft opacity

      kanjiContainer.appendChild(kanji);

      // Remove kanji after it falls
      setTimeout(() => {
        kanji.remove();
      }, 6000); // Matches max animation duration
    }, 500); // New kanji every 0.5 sec
  }
}
