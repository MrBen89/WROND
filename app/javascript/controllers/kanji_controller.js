import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modeBox", "playButton", "selectedMode", "modeDescription", "floatingKanji"];

  connect() {
    console.log("Kanji Controller Connected!");

    this.setupModeSelection();
    this.setupFloatingKanji();
  }

  setupModeSelection() {
    const descriptions = {
      kanji: "Kanji mode allows you to practice individual kanji.<br>The classic mode!",
      story: "HEEHEE<br>HEEHEE"
    };

    // Log to check if targets are correctly selected
    console.log(this.modeBoxTargets);

    // Add event listeners for mode buttons
    this.modeBoxTargets.forEach(button => {
      button.addEventListener("click", () => {
        // Toggle active class
        if (button.classList.contains("active")) {
          button.classList.remove("active");
          this.selectedModeTarget.value = "";
          this.playButtonTarget.setAttribute("disabled", "true");
          this.modeDescriptionTarget.innerHTML = "Choose a mode!";
        } else {
          this.modeBoxTargets.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");

          const mode = button.getAttribute("data-mode");
          this.selectedModeTarget.value = mode;
          this.playButtonTarget.removeAttribute("disabled");

          // Update description and button state
          this.modeDescriptionTarget.innerHTML = descriptions[mode];
        }
      });
    });
  }

  setupFloatingKanji() {
    this.floatingKanjiTargets.forEach(kanji => {
      let kanjiWidth = 50; // Adjust this based on your font size or layout
      let kanjiHeight = 50;
      let randomX = Math.random() * (window.innerWidth - kanjiWidth);
      let randomY = Math.random() * (window.innerHeight - kanjiHeight);
      let randomDelay = Math.random() * 3;

      kanji.style.position = "absolute";
      kanji.style.left = `${randomX}px`;
      kanji.style.top = `${randomY}px`;

      // Apply CSS animation for floating effect
      kanji.style.animation = `float 4s infinite ease-in-out alternate`;
      kanji.style.animationDelay = `${randomDelay}s`;
    });
  }

}
