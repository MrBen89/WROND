import { Controller } from "@hotwired/stimulus";

let text = "";

export default class extends Controller {
  static targets = ["kanji", "dropZone"];

  connect() {
    console.log("Kanji Controller Connected!");

    const kanjiCharacters = document.querySelectorAll(".kanji-character");
    kanjiCharacters.forEach(kanji => {
      kanji.setAttribute("draggable", true);
      kanji.addEventListener("dragstart", this.dragStart.bind(this));
      kanji.addEventListener("dragend", this.dragEnd.bind(this));
    });

    const dropZones = document.querySelectorAll(".drop-zone");
    dropZones.forEach(zone => {
      zone.addEventListener("dragover", this.dragOver.bind(this));
      zone.addEventListener("drop", this.drop.bind(this));
      zone.addEventListener("dblclick", this.clear.bind(this));
    });
  }

  dragStart(event) {
    text = event.target.dataset.kanji;
    setTimeout(() => event.target.classList.add("hidden"), 0);
  }

  dragEnd(event) {
    event.target.classList.remove("hidden");
  }

  dragOver(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    if (!text) return;

    const dropZone = event.target;
    const expectedKanji = dropZone.dataset.expectedKanji;

    if (!dropZone.textContent) {
      dropZone.textContent = text;
      dropZone.style.backgroundColor = text === expectedKanji ? "rgb(0, 102, 204)" : "rgb(204, 0, 0)";

      this.checkCompletion(); // Check if all kanji are placed correctly
    }
  }

  clear(event) {
    event.target.textContent = "";
    event.target.style.backgroundColor = ""; // Reset color
  }

  check_for_level_up() {
    console.log("Checking for level up...");
    let xp = parseInt(document.getElementById("xp_field").value);
    let level = parseInt(document.getElementById("level_field").value);

    document.getElementById("level-span").innerText = level;
    document.getElementById("level-up-span").innerText = Math.floor(xp / 100);

    if (xp / 100 >= (level + 1)) {
      document.getElementById("level_field").value = Math.floor(xp / 100);
      console.log("Level up!");
      return true;
    }
    return false;
  }

  update_user_record() {
    let xpField = document.getElementById("xp_field");
    xpField.value = parseInt(xpField.value) + 100;
  }

  experience_roller() {
    let target = 100;
    let count = parseInt(document.getElementById("xp-value").innerText);
    let increment = 1;

    if (count < target) {
      count += increment;
      document.getElementById("xp-value").innerText = `${count}`;
      setTimeout(() => {
        this.experience_roller();
      }, 5);
    }
  }

  checkCompletion() {
    const dropZones = document.querySelectorAll(".drop-zone");
    const allCorrect = [...dropZones].every(zone => zone.textContent === zone.dataset.expectedKanji);

    if (allCorrect) {
      setTimeout(() => {
        document.getElementById("conclussionModal").classList.remove("hidden");
        document.getElementById("popup-button").addEventListener("click", () => {
          document.getElementById("conclussionModal").style.display = "none";
        });

        this.experience_roller();
        this.update_user_record();
        console.log(this.check_for_level_up());

        if (this.check_for_level_up()) {
          setTimeout(() => {
            document.getElementById("level-up").classList.remove("hidden");
            setTimeout(() => {
              document.getElementById("level-up").classList.add("expanded");
            }, 1);
          }, 1500);
        }
      }, 1000);
    }
  }
}
