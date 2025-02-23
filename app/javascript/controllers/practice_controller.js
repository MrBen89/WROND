// controllers/kanji_controller.js
import { Controller } from "@hotwired/stimulus";
let text = "";
export default class extends Controller {
  static targets = ["kanji", "dropZone"];

  connect() {
    console.log("Kanji Controller Connected!");
    console.log(this.kanjiTargets);
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
    console.log(event);
    // event.dataTransfer.setData("text", event.target.dataset.kanji);
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
    // const kanji = event.dataTransfer.getData("text");
    if (!event.target.textContent) {
      event.target.textContent = text;
      event.target.style.backgroundColor = "rgb(2, 132, 19)";
    }
    console.log(document.querySelector(".sentence").innerText);
  }

  clear(event) {
    event.target.textContent = "";
  }

}
