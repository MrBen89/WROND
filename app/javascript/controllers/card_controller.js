import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [
    "card",
    "questionMark",
    "playButton",
    "kanjiDisplay",
    "jlptLevel",
    "meaning",
    "kunyomi",
    "onyomi",
    "strokeCount",
    "grade",
    "selectedKanjiInput",
    "levelFilter"
  ];

  connect() {
    this.isExpanded = false;
  }

  // Handle click on a card
  selectCard(event) {
    const kanjiData = event.currentTarget.dataset;
    const isSolved = Number(kanjiData.solved) > 0;
    const questionMark = event.currentTarget.querySelector(".question-mark");

    questionMark.textContent = isSolved ? kanjiData.kanji : "?";

    if (!this.isExpanded) {
      this.leftSideTarget.classList.add("expanded");
      this.rightSideTarget.classList.add("shrunk");
      this.leftSideTarget.style.display = "block";
      this.isExpanded = true;
    }

    this.cardTargets.forEach((btn) => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");

    this.selectedKanjiInputTarget.value = kanjiData.kanji;
    this.kanjiDisplayTarget.textContent = isSolved ? kanjiData.kanji : "?";
    this.jlptLevelTarget.textContent = kanjiData.jlpt || "N5";
    this.meaningTarget.textContent = isSolved ? kanjiData.meaning : "?";
    this.kunyomiTarget.textContent = isSolved ? kanjiData.kunyomi : "?";
    this.onyomiTarget.textContent = isSolved ? kanjiData.onyomi : "?";
    this.strokeCountTarget.textContent = isSolved ? kanjiData.strokeCount : "?";
    this.gradeTarget.textContent = isSolved ? kanjiData.grade : "?";

    this.playButtonTarget.setAttribute("data-url", kanjiData.url);
    this.playButtonTarget.disabled = false;
  }

  // Play button click event
  play() {
    const url = this.playButtonTarget.getAttribute("data-url");
    if (url) {
      window.location.href = url;
    }
  }

  // Level filter click event
  filterLevel(event) {
    const selectedLevel = event.currentTarget.classList[1];

    this.cardTargets.forEach((card) => {
      const cardLevel = card.dataset.jlpt;

      if (selectedLevel === "level-all" || `level-${cardLevel}` === selectedLevel) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
}
