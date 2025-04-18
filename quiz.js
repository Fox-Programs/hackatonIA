let currentIndex = 0;
let intervalId = null;
let score = 0;
let hasAnswered = false;

function startQuiz() {
  localStorage.setItem("quiz_started", "true");
  localStorage.setItem("quiz_index", "0");
  currentIndex = 0;

  intervalId = setInterval(() => {
    currentIndex++;
    hasAnswered = false;

    if (currentIndex >= quiz.length) {
      clearInterval(intervalId);
    }

    localStorage.setItem("quiz_index", currentIndex.toString());
  }, 10000); // Changement toutes les 10 secondes
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

function handleAnswer(index) {
  if (hasAnswered) return; // Une seule réponse autorisée

  const currentQ = quiz[currentIndex];
  if (index === currentQ.answer) {
    score++;
  }

  hasAnswered = true;
}

function showFinalScore() {
  const questionElem = document.getElementById("question");
  const answersElem = document.getElementById("answers");
  const waitMsg = document.getElementById("wait-message");

  questionElem.textContent = `🎉 Quiz terminé !`;
  answersElem.innerHTML = `🧠 Ton score : <strong>${score} / ${quiz.length}</strong>`;
  waitMsg.style.display = "none";

  // Enregistrer score dans localStorage
  const allScores = JSON.parse(localStorage.getItem("scores") || "[]");
  allScores.push(score);
  localStorage.setItem("scores", JSON.stringify(allScores));
}
