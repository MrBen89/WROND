/* <script>
document.addEventListener("DOMContentLoaded", function () {
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
  const grade = document.getElementById("grade");
  const levelFilters = document.querySelectorAll(".level-filter");

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
      grade.textContent = isSolved ? kanjiData.grade : "?";

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

  document.querySelector(".level-4").click();
});

</script> */
