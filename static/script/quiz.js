const currentQ = document.getElementById('current-question');
const answersContainer = document.getElementById('answers');
const waitMessage = document.getElementById('wait-message');
const quizBlock = document.getElementById('quiz-block');

let score = 0; // Variable pour le score

// Fonction pour afficher une question et ses options
function displayQuestion(index) {
  const questionData = quiz[index]; // Récupère les données de la question actuelle
  document.getElementById('question').textContent = questionData.question; // Affiche la question

  // Réinitialiser la zone des réponses
  answersContainer.innerHTML = '';

  // Pour chaque option, créer un bouton cliquable
  questionData.options.forEach((option, i) => {
    const answerBlock = document.createElement('div');
    answerBlock.classList.add('quiz-answer');
    answerBlock.textContent = option;

    // Ajout de la logique de clic pour vérifier la réponse
    answerBlock.onclick = function () {
      if (i === questionData.answer) { // Si la réponse est correcte
        answerBlock.classList.add('correct');
        score++; // Incrémente le score
      } else {
        answerBlock.classList.add('incorrect');
      }
      
      // Désactiver les autres réponses après avoir cliqué
      Array.from(answersContainer.children).forEach(child => {
        child.style.pointerEvents = 'none'; // Désactive les clics sur les autres réponses
      });

      // Passer à la question suivante après un délai
      setTimeout(() => {
        const nextIndex = index + 1;
        if (nextIndex < quiz.length) {
          displayQuestion(nextIndex); // Affiche la question suivante
          currentQ.textContent = `${nextIndex + 1} / ${quiz.length}`; // Met à jour le compteur de questions
        } else {
          // Afficher le score final
          document.getElementById('final-score').style.display = 'block';
          document.getElementById('final-score').textContent = `Votre score final : ${score} / ${quiz.length}`;
          localStorage.setItem("quiz_started", "false"); // Réinitialiser l'état du quiz
        }
      }, 1000); // Attendre 1 seconde avant de passer à la question suivante
    };

    // Ajouter chaque option à l'élément de réponse
    answersContainer.appendChild(answerBlock);
  });

  // Mettre à jour l'index de la question dans le localStorage
  localStorage.setItem("quiz_index", index + 1);
}

// Fonction pour démarrer le quiz
function startQuiz() {
  localStorage.setItem("quiz_started", "true");  // Marque que le quiz a démarré
  localStorage.setItem("quiz_index", "0");      // Commence à la première question
  location.reload(); // Recharge la page pour démarrer le quiz
}

// Écouter le démarrage du quiz lorsque le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", () => {
  const started = localStorage.getItem("quiz_started") === "true"; // Vérifie si le quiz a démarré

  if (started) {
    waitMessage.style.display = 'none'; // Cacher le message d'attente
    quizBlock.style.display = 'block';  // Afficher le bloc du quiz
    const index = parseInt(localStorage.getItem("quiz_index") || "0");
    displayQuestion(index); // Afficher la première question
    currentQ.textContent = `${index + 1} / ${quiz.length}`; // Afficher l'indicateur de question
  } else {
    waitMessage.textContent = '⏳ En attente du lancement du quiz...'; // Afficher un message d'attente
  }
});
