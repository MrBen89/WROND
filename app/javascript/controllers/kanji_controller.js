import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["kanji"];

  connect() {
    this.spawnKanji();
  }

  spawnKanji() {
    const container = document.body; // Append kanji to the body
    const kanjiList = ["水", "火", "木", "金", "土", "日", "月", "山", "川"]; // Example kanji
    const numKanji = 15; // Number of floating kanji

    for (let i = 0; i < numKanji; i++) {
      const kanji = document.createElement("div");
      kanji.innerText = kanjiList[Math.floor(Math.random() * kanjiList.length)];
      kanji.classList.add("floating-kanji");
      kanji.style.left = `${Math.random() * 100}vw`;
      kanji.style.top = `${Math.random() * 100}vh`;
      kanji.setAttribute("data-action", "mousedown->kanji#drag");

      container.appendChild(kanji);
    }
  }

  drag(event) {
    event.preventDefault();
    const kanji = event.target;
    let shiftX = event.clientX - kanji.getBoundingClientRect().left;
    let shiftY = event.clientY - kanji.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      kanji.style.left = pageX - shiftX + "px";
      kanji.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    kanji.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      kanji.onmouseup = null;
    };
  }
}
