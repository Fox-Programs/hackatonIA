let currentIndex = 0;
let intervalId = null;

function startQuiz() {
  localStorage.setItem("quiz_started", "true");
  localStorage.setItem("quiz_index", "0");
  currentIndex = 0;

  // Initialisation du score pour chaque participant
  localStorage.setItem("score", "0");

  intervalId = setInterval(() => {
    currentIndex++;
    if (currentIndex >= quiz.length) {
      clearInterval(intervalId);
      // Enregistrer le score à la fin du quiz
      const score = localStorage.getItem("score");
      const scores = JSON.parse(localStorage.getItem("scores") || "[]");
      scores.push(parseInt(score));
      localStorage.setItem("scores", JSON.stringify(scores));
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
      // Sauvegarder le score final
      const finalScore = calculateScore();
      localStorage.setItem("score", finalScore.toString());
    }
  }

  window.addEventListener("storage", updateFromStorage);
  setInterval(updateFromStorage, 1000);
}

// Fonction pour calculer le score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < quiz.length; i++) {
    const userAnswer = localStorage.getItem("answer_" + i);
    if (parseInt(userAnswer) === quiz[i].answer) {
      score++;
    }
  }
  return score;
}

// Enregistrer la réponse de l'utilisateur
function saveAnswer(questionIndex, answerIndex) {
  localStorage.setItem("answer_" + questionIndex, answerIndex);
}
