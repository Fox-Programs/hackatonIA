let currentIndex = 0;
let intervalId = null;

function startQuiz() {
  localStorage.setItem("quiz_started", "true");
  localStorage.setItem("quiz_index", "0");
  currentIndex = 0;

  intervalId = setInterval(() => {
    currentIndex++;
    if (currentIndex >= quiz.length) {
      clearInterval(intervalId);
    }
    localStorage.setItem("quiz_index", currentIndex.toString());
  }, 10000); // Change toutes les 10 secondes
}

function listenToChanges(displayQuestionCallback) {
  function updateFromStorage() {
    const started = localStorage.getItem("quiz_started") === "true";
    const index = parseInt(localStorage.getItem("quiz_index") || "0");

    if (started && index < quiz.length) {
      displayQuestionCallback(index);
    } else if (started && index >= quiz.length) {
      displayQuestionCallback(-1); // fin du quiz
    }
  }

  window.addEventListener("storage", updateFromStorage);
  setInterval(updateFromStorage, 1000);
}
