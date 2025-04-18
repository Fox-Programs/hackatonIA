// static/js/script.js

// ---------- ASTUCE ALÉATOIRE SUR LA PAGE D'ACCUEIL ----------


const tips = [
    "Congelez vos fruits trop mûrs pour en faire des smoothies.",
    "Utilisez les fanes de carottes pour faire du pesto.",
    "Faites un bouillon avec les épluchures de légumes.",
    "Ne jetez pas le pain dur : faites-en du pain perdu ou de la chapelure.",
    "Faites vos courses avec une liste pour éviter les achats impulsifs."
];

document.addEventListener('DOMContentLoaded', () => {
    const tipElement = document.getElementById('random-tip');
    if (tipElement) {
        const tip = tips[Math.floor(Math.random() * tips.length)];
        tipElement.textContent = tip;
    }

    // ---------- FORMULAIRE D’IDÉES SUR LA PAGE AGIR ----------
    const ideaForm = document.querySelector('form');
    const confirmation = document.getElementById('confirmation');

    if (ideaForm && confirmation) {
        ideaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const ideaTextarea = document.getElementById('idea');
            const ideaText = ideaTextarea.value.trim();

            if (ideaText !== '') {
                confirmation.textContent = "Merci pour votre contribution ! 💚";
                ideaTextarea.value = '';
            } else {
                confirmation.textContent = "Veuillez entrer une idée avant de soumettre.";
            }
        });
    }
});

function showRandomTip() {
    // Liste des astuces pour éviter le gaspillage alimentaire
    const tips = [
        "Réutilisez les restes pour créer de nouveaux repas, comme une soupe ou une salade.",
        "Congelez les aliments qui commencent à se périmer, cela les gardera plus longtemps.",
        "Rangez vos aliments de manière à utiliser d'abord ceux qui arrivent en fin de date de péremption.",
        "Les épluchures de légumes peuvent souvent être utilisées pour faire des bouillons maison.",
        "Planifiez vos repas pour éviter d'acheter plus d'aliments que vous ne pouvez consommer.",
        "Faites attention à la taille des portions pour éviter de trop préparer et gaspiller.",
        "Offrez vos excédents alimentaires à des associations locales ou des voisins."
    ];

    // Sélectionner une astuce aléatoire
    const randomIndex = Math.floor(Math.random() * tips.length);
    const randomTip = tips[randomIndex];

    // Afficher l'astuce dans l'élément <p> avec l'ID "random-tip"
    document.getElementById("random-tip").textContent = randomTip;
}

document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers');
    const resultDisplay = document.getElementById('result');

    const progressBar = document.createElement('div');
    progressBar.id = 'quiz-progress';
    progressBar.style.height = '10px';
    progressBar.style.background = '#c8e6c9';
    progressBar.style.marginTop = '10px';
    progressBar.style.borderRadius = '5px';
    const fill = document.createElement('div');
    fill.style.height = '100%';
    fill.style.width = '0%';
    fill.style.backgroundColor = '#4caf50';
    fill.style.transition = 'width 0.3s ease';
    fill.style.borderRadius = '5px';
    progressBar.appendChild(fill);

    const container = document.getElementById('quiz-container');
    if (container && questionText && answersContainer) {
        container.insertBefore(progressBar, container.children[1]);

        let currentQuestion = 0;
        let score = 0;

        const updateProgress = () => {
            const percent = ((currentQuestion) / quiz.length) * 100;
            fill.style.width = `${percent}%`;
        };

        const showQuestion = () => {
            updateProgress();
            const q = quiz[currentQuestion];
            questionText.textContent = q.question;
            answersContainer.innerHTML = '';
            resultDisplay.textContent = '';

            q.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.textContent = option;
                btn.classList.add('answer-btn');
                btn.style.display = 'block';
                btn.style.margin = '5px 0';
                btn.onclick = () => {
                    if (index === q.answer) score++;
                    currentQuestion++;
                    if (currentQuestion < quiz.length) {
                        showQuestion();
                    } else {
                        showResult();
                    }
                };
                answersContainer.appendChild(btn);
            });
        };

        const showResult = () => {
            fill.style.width = '100%';
            questionText.textContent = '';
            answersContainer.innerHTML = '';
            resultDisplay.textContent = `🎉 Vous avez obtenu ${score} / ${quiz.length} bonnes réponses !`;

            // Animation si bon score
            if (score === quiz.length) {
                confettiAnimation();
            }
        };

        const confettiAnimation = () => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            document.body.appendChild(confetti);

            for (let i = 0; i < 100; i++) {
                const particle = document.createElement('div');
                particle.classList.add('confetti-piece');
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.animationDelay = Math.random() * 2 + 's';
                particle.style.backgroundColor = ['#4caf50', '#ffeb3b', '#8bc34a'][Math.floor(Math.random() * 3)];
                confetti.appendChild(particle);
            }

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        };

        showQuestion();
    }
});





