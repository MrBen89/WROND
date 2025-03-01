import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="index-side-menu"
export default class extends Controller {
  connect() {
      const leftSide = document.querySelector(".left-side");
      const rightSide = document.querySelector(".right-side");
      const cards = document.querySelectorAll(".card");
      const playButton = document.getElementById("play-btn");
      const selectedKanjiInput = document.getElementById("selected-kanji");
      const kanjiDisplay = document.getElementById("kanji-display");
      const jlptLevel = document.getElementById("jlpt-level");
      const meaning = document.getElementById("meaning");
      const kunyomi = document.getElementById("kunyomi");
      const onyomi = document.getElementById("onyomi");
      const strokeCount = document.getElementById("stroke-count");
      const levelFilters = document.querySelectorAll(".level-filter");

      if (document.getElementById("n1_done").innerText == document.getElementById("n1_total").innerText){document.getElementById("crown_n1").classList.remove("hidden")}
      if (document.getElementById("n2_done").innerText == document.getElementById("n2_total").innerText){document.getElementById("crown_n2").classList.remove("hidden")}
      if (document.getElementById("n3_done").innerText == document.getElementById("n3_total").innerText){document.getElementById("crown_n3").classList.remove("hidden")}
      if (document.getElementById("n4_done").innerText == document.getElementById("n4_total").innerText){document.getElementById("crown_n4").classList.remove("hidden")}
      if (document.getElementById("n5_done").innerText == document.getElementById("n5_total").innerText){document.getElementById("crown_n5").classList.remove("hidden")}
      if (document.getElementById("all_done").innerText == document.getElementById("all_total").innerText){document.getElementById("crown_all").classList.remove("hidden")}

      let isExpanded = false;

      cards.forEach((card) => {
        const kanjiData = card.dataset;
        const isSolved = kanjiData.solved >= 1; // Ensure correct boolean comparison
        const questionMark = card.querySelector(".question-mark");

        questionMark.textContent = isSolved ? kanjiData.kanji : "?";

        card.addEventListener("click", function () {
          if (!isExpanded) {
            leftSide.classList.add("expanded");
            rightSide.classList.add("shrunk");
            leftSide.style.display = "block";
            isExpanded = true;
          }

          cards.forEach((btn) => btn.classList.remove("active"));
          this.classList.add("active");

          // Re-check if the kanji is solved inside the event listener
          const isSolved = Number(kanjiData.solved) > 0;

          selectedKanjiInput.value = kanjiData.kanji;
          kanjiDisplay.textContent = isSolved ? kanjiData.kanji : "?";
          jlptLevel.textContent = kanjiData.jlpt || "N5";
          meaning.textContent = isSolved ? kanjiData.meaning : "?";
          kunyomi.textContent = isSolved ? kanjiData.kunyomi : "?";
          onyomi.textContent = isSolved ? kanjiData.onyomi : "?";
          strokeCount.textContent = isSolved ? kanjiData.strokeCount : "?";

          playButton.setAttribute("data-url", kanjiData.url);
          playButton.disabled = false; // Ensure the button is enabled
        });
      });

      playButton.addEventListener("click", function () {
        const url = playButton.getAttribute("data-url");
        if (url) {
          window.location.href = url;
        }
      });

      levelFilters.forEach((filter) => {
        filter.addEventListener("mouseenter", function () {
          let temp = this.innerText
          this.innerText = this.parentNode.querySelector("span").innerText
          this.parentNode.querySelector("span").innerText = temp;
        })
        filter.addEventListener("mouseleave", function () {
          let temp = this.innerText
          this.innerText = this.parentNode.querySelector("span").innerText
          this.parentNode.querySelector("span").innerText = temp;
        })
        filter.addEventListener("click", function () {
          const selectedLevel = this.classList[1];

          cards.forEach((card) => {
            const cardLevel = card.dataset.jlpt;

            if (selectedLevel === "level-all" || `level-${cardLevel}` === selectedLevel) {
              card.style.display = "block";
            } else {
              card.style.display = "none";
            }
          });
        });
      });
    }
}
