let currentIndex = 0;
let userAnswers = [];

function startQuiz() {
    // Démarre le quiz en stockant une valeur dans le localStorage
    localStorage.setItem("quiz_started", "true");
    localStorage.setItem("quiz_index", "0");
    currentIndex = 0;
    userAnswers = [];  // Réinitialise les réponses

    // Intervalle pour mettre à jour l'indice toutes les 10 secondes
    intervalId = setInterval(() => {
        currentIndex++;
        if (currentIndex >= quiz.length) {
            clearInterval(intervalId);
        }
        localStorage.setItem("quiz_index", currentIndex.toString());
    }, 10000); // Change toutes les 10 secondes
}

// Fonction pour écouter les changements dans localStorage
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

// Fonction pour afficher une question donnée par son index
function displayQuestion(index) {
  const questionElem = document.getElementById("question");
  const answersElem = document.getElementById("answers");
  const waitMsg = document.getElementById("wait-message");

  // Vérification de l'existence des éléments avant de manipuler leur style
  if (!questionElem || !answersElem) {
      console.error("Éléments manquants dans le DOM");
      return;
  }

  if (waitMsg) {
      waitMsg.style.display = "none";  // Cache le message d'attente
  }

  if (index === -1) {
      showFinalScore();
      return;
  }

  const q = quiz[index];
  questionElem.textContent = q.question;
  answersElem.innerHTML = "";

  q.options.forEach((option, i) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.onclick = () => {
          handleAnswer(i);
          li.style.backgroundColor = "#ccc"; // Visuel réponse sélectionnée
      };
      answersElem.appendChild(li);
  });
}



// Fonction pour gérer la réponse de l'utilisateur
function handleAnswer(selectedIndex) {
    userAnswers[currentIndex] = selectedIndex; // Sauvegarde de la réponse
    currentIndex++;
    localStorage.setItem("quiz_index", currentIndex.toString());
}

// Affichage du score final à la fin du quiz
function showFinalScore() {
    let score = 0;
    quiz.forEach((q, i) => {
        if (userAnswers[i] === q.answer) {
            score++;
        }
    });

    const finalScoreElem = document.getElementById("final-score");
    finalScoreElem.style.display = "block";
    finalScoreElem.textContent = `Votre score : ${score} / ${quiz.length}`;

    localStorage.setItem("quiz_started", "false");
    localStorage.setItem("quiz_index", "0");

    saveScore(score);
}

// Sauvegarde du score dans localStorage
function saveScore(score) {
    const scores = JSON.parse(localStorage.getItem("scores") || "[]");
    scores.push(score);
    localStorage.setItem("scores", JSON.stringify(scores));
}

// Vérification au démarrage pour savoir si le quiz a déjà commencé
document.addEventListener("DOMContentLoaded", () => {
    const started = localStorage.getItem("quiz_started") === "true";
    if (started) {
        const index = parseInt(localStorage.getItem("quiz_index") || "0");
        listenToChanges(displayQuestion);
    }
});

window.onload = () => {
  const started = localStorage.getItem("quiz_started") === "true";
  if (started) {
      const index = parseInt(localStorage.getItem("quiz_index") || "0");
      listenToChanges(displayQuestion);
  }
};
