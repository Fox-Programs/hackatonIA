// ---------- QUIZ INTERACTIF AVEC BARRE DE PROGRESSION ET ANIMATION ----------
const quiz = [
    {
        question: "A ton avis, quelle proportion de la nourriture produite dans le monde est gaspillée ?",
        options: ["1/10", "1/3", "1/2"],
        answer: 1
    },
    {
        question: "Pour toi, quel aliment est le plus gaspillé dans les foyers ?",
        options: ["Le pain", "Le fromage", "La viande"],
        answer: 0
    },
    {
        question: "Sais-tu , quelle est la différence entre DDM et DLC ?",
        options: [
            "Aucune, c’est la même chose",
            "DLC = limite sanitaire, DDM = limite de qualité",
            "DDM = sécurité alimentaire, DLC = goût"
        ],
        answer: 1
    },
    {
        question: "Combien de kilos de nourriture jette un Français par an ?",
        options: ["Environ 10 kg", "Environ 30 kg", "Environ 60 kg"],
        answer: 1
    },
    {
        question: "Sais-tu ce que c'est “Too Good To Go” ?",
        options: ["Une marque de surgelés", "Une application anti-gaspillage", "Un slogan publicitaire"],
        answer: 1
    },
    {
        question: "Quel geste simple réduit efficacement le gaspillage à la maison ?",
        options: ["Acheter en gros", "Jeter les produits dès la date atteinte", "Faire une liste de courses"],
        answer: 2
    },
    {
        question: "A ton avis, p0ourquoi éviter de stocker les tomates au frigo ?",
        options: ["Elles perdent du goût", "Elles moisissent plus vite", "C’est illégal en France"],
        answer: 0
    },
    {
        question: "Que faire avec un yaourt périmé depuis 3 jours (DDM) ?",
        options: [
            "Le jeter immédiatement",
            "Le sentir et goûter : il est souvent encore bon",
            "Le recycler en cosmétique"
        ],
        answer: 1
    },
    {
        question: "En Europe, que dit la loi française de 2016 pour les supermarchés ?",
        options: [
            "Obligation de composter les invendus",
            "Interdiction de jeter des invendus comestibles",
            "Droit de garder les invendus pour les employés"
        ],
        answer: 1
    },
    {
        question: "Quel est le pourcentage des déchets alimentaires compostables ?",
        options: ["Moins de 10%", "Environ 30%", "Plus de 50%"],
        answer: 2
    }
];