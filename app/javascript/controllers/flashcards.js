console.log("Flashcards JavaScript Loaded");


function openFlashcard(card) {
  document.querySelectorAll('.flashcard').forEach(f => f.classList.remove('active'));
  document.querySelector(".flashcard-overlay").style.display = "block";
  card.classList.add("active");
}

function closeFlashcard(event, button) {
  event.stopPropagation();
  button.closest(".flashcard").classList.remove("active");
  document.querySelector(".flashcard-overlay").style.display = "none";
}

function closeAllFlashcards() {
  document.querySelectorAll('.flashcard').forEach(f => f.classList.remove('active'));
  document.querySelector(".flashcard-overlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".toggle-details-btn").forEach(button => {
    button.addEventListener("click", function() {
      let target = document.getElementById(this.dataset.target);
      if (target) {
        target.classList.toggle("hidden");
        this.textContent = target.classList.contains("hidden") ? "Show Details" : "Hide Details";
      }
    });
  });
});
