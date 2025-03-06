import { Controller } from "@hotwired/stimulus";

let text = "";
const kanjiCharacters = document.querySelectorAll(".kanji-character");
export default class extends Controller {
  static targets = ["kanji", "dropZone"];

  connect() {
    console.log("Kanji Controller Connected!");


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
    let base_xp = parseInt(document.getElementById("base_xp").innerText);
    let level = parseInt(document.getElementById("level_field").value);

    document.getElementById("level-span").innerText = level;
    document.getElementById("level-up-span").innerText = level + 1;

    if (base_xp + (parseInt(document.getElementById("kanji_count").innerText) * 25) >= (50 + level * 50)) {
      document.getElementById("level_field").value = level + 1;
      console.log("Level up!");
      return true;
    }
    return false;
  }

  update_user_record() {
    let multiplier = parseInt(document.getElementById("kanji_count").innerText)
    let xpField = document.getElementById("xp_field");
    xpField.value = parseInt(xpField.value) + multiplier * 25;
    console.log(document.getElementById("practice-submit"))
    document.getElementById("practice_form").requestSubmit();
  }

  experience_roller() {
    let target = parseInt(document.getElementById("kanji_count").innerText) * 25
    let count = parseInt(document.getElementById("xp-value").innerText);
    let increment = 1;

    if (count < target) {
      count += increment;
      document.getElementById("xp-value").innerText = `${count}`;
      setTimeout(() => {
        this.experience_roller();
      }, 10);
    }
  }

  update_xp_bar () {
    const xp_bar_level_element = document.getElementById("xp_bar_level");
    const xp_bar_current_element = document.getElementById("xp_bar_current");
    const xp_bar_level_next = document.getElementById("xp_bar_next");
    const fillbar = document.getElementById("fillbar");
    let level = parseInt(xp_bar_level_element.innerText)
    let total_xp = parseInt(xp_bar_current_element.innerText) + parseInt(document.getElementById("kanji_count").innerText) * 25;
    let next_xp = parseInt(xp_bar_level_next.innerText)
    if (total_xp > next_xp){
      total_xp -= next_xp
      level += 1
      next_xp = (50 + level * 50)
    }
    xp_bar_current_element.innerText = total_xp
    xp_bar_level_next.innerText = next_xp
    xp_bar_level_element.innerText = level
    fillbar.style.width = `${100 - (total_xp / next_xp * 100)}%`
  }

  checkCompletion() {
    const dropZones = document.querySelectorAll(".drop-zone");
    const allCorrect = [...dropZones].every(zone => zone.textContent === zone.dataset.expectedKanji);

    if (allCorrect) {
      setTimeout(() => {
        document.getElementById("conclussionModal").classList.remove("hidden");
        document.getElementById("popup-button").addEventListener("click", () => {
          document.getElementById("conclussionModal").style.display = "none";
          this.update_user_record();
        });
        this.update_xp_bar()
        this.experience_roller();
        if (this.check_for_level_up()) {
          setTimeout(() => {
            document.getElementById("level-up").classList.remove("hidden");
            setTimeout(() => {
              document.getElementById("level-up").classList.add("expanded");
              document.getElementById("level_up_audio").play()
            }, 1);
          }, 1500);
        }

      }, 1000);
    }
  }
}
