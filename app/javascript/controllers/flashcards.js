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
