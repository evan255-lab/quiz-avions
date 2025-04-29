const questions = [
    {
      image: "images/avionA380.jpg",
      options: ["Boeing 747", "Airbus A380", "Concorde", "Rafale"],
      bonneReponse: "Airbus A380"
    },
    {
      image: "images/avionBoeing747.jpg",
      options: ["Airbus A380", "Boeing 747", "Concorde", "F-16"],
      bonneReponse: "Boeing 747"
    },
    {
      image: "images/avionConcorde.jpg",
      options: ["Concorde", "Boeing 737", "Lockheed Martin F-22", "Mirage 2000"],
      bonneReponse: "Concorde"
    },
    {
      image: "images/avionF22.jpg",
      options: ["Boeing 737", "Lockheed Martin F-22 Raptor", "Concorde", "A350"],
      bonneReponse: "Lockheed Martin F-22 Raptor"
    },
    {
      image: "images/avionBoeing787.jpg",
      options: ["Boeing 787 Dreamliner", "Airbus A350", "Concorde", "F-16"],
      bonneReponse: "Boeing 787 Dreamliner"
    },
    {
      image: "images/avionA320.jpg",
      options: ["Boeing 737", "Airbus A320", "Boeing 747", "Concorde"],
      bonneReponse: "Airbus A320"
    },
    {
      image: "images/avionBoeing737.jpg",
      options: ["Boeing 737", "F-15 Eagle", "A350", "Airbus A320"],
      bonneReponse: "Boeing 737"
    },
    {
      image: "images/avionC130.jpg",
      options: ["Lockheed Martin C-130 Hercules", "F-22 Raptor", "Boeing 777", "Concorde"],
      bonneReponse: "Lockheed Martin C-130 Hercules"
    },
    {
      image: "images/avionMirage2000.jpg",
      options: ["Mirage 2000", "Boeing 777", "Airbus A380", "F-16"],
      bonneReponse: "Mirage 2000"
    },
    {
      image: "images/avionF15.jpg",
      options: ["F-15 Eagle", "Boeing 777", "Airbus A350", "Boeing 787"],
      bonneReponse: "F-15 Eagle"
    },
    {
      image: "images/avionBoeing777.jpg",
      options: ["Airbus A350", "Boeing 777", "Concorde", "F-22"],
      bonneReponse: "Boeing 777"
    },
    {
      image: "images/avionA350.jpg",
      options: ["Airbus A350", "Boeing 737", "Mirage 2000", "F-15 Eagle"],
      bonneReponse: "Airbus A350"
    },
    {
      image: "images/avionSR71.jpg",
      options: ["Lockheed Martin SR-71 Blackbird", "Boeing 767", "Concorde", "F-22"],
      bonneReponse: "Lockheed Martin SR-71 Blackbird"
    },
    {
      image: "images/avionA330.jpg",
      options: ["Airbus A330", "Boeing 747", "Airbus A320", "Boeing 787"],
      bonneReponse: "Airbus A330"
    },
    {
      image: "images/avionBoeing767.jpg",
      options: ["Boeing 767", "Airbus A350", "Concorde", "F-15 Eagle"],
      bonneReponse: "Boeing 767"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];
  
  // Fonction pour mélanger les questions
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Échange les éléments
    }
  }
  
  // Fonction pour mélanger les options de chaque question
  function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]]; // Échange les éléments
    }
  }
  
  function loadQuestion() {
    const question = questions[currentQuestionIndex];
    // Mélanger les options avant de les afficher
    shuffleOptions(question.options);
    
    document.getElementById('question-image').src = question.image;
    document.getElementById('options').innerHTML = question.options.map((option) => 
      `<button onclick="checkAnswer('${option}')">${option}</button>`
    ).join('');
    document.getElementById('resultat').innerText = ''; // Réinitialise le texte du résultat
  }
  
  function checkAnswer(answer) {
    const question = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('#options button');
    const resultText = answer === question.bonneReponse ? 'Bonne réponse!' : 'Mauvaise réponse!';
    const resultColor = answer === question.bonneReponse ? 'green' : 'red';
    
    // Afficher le texte sous les options de réponse
    const resultDiv = document.createElement('div');
    resultDiv.style.color = resultColor;
    resultDiv.innerText = resultText;
    
    // Placer le message au bas, centré
    const resultContainer = document.getElementById('resultat');
    resultContainer.innerHTML = ''; // Réinitialise
    resultContainer.appendChild(resultDiv); // Ajoute le résultat sous les options
    resultContainer.style.textAlign = 'center'; // Centrer le texte
    
    // Ajouter la réponse dans la liste des réponses de l'utilisateur
    userAnswers.push({
      question: question,
      answer: answer,
      correctAnswer: question.bonneReponse
    });
  
    // Mettre à jour le score
    if (answer === question.bonneReponse) {
      score++;
    }
    document.getElementById('score').innerText = `Score : ${score} / ${questions.length}`;
  
    // Passer à la question suivante après 1 seconde
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      setTimeout(loadQuestion, 1000); // Attendre avant de charger la prochaine question
    } else {
      setTimeout(showFinalResult, 1000); // Afficher les résultats finaux
    }
  }
  
  function showFinalResult() {
    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById('final-score').innerHTML = `Votre score : ${score} / ${questions.length} (${percentage}%)`;
  
    let recapHtml = "<h3>Récapitulatif :</h3><ul>";
    
    // Boucle pour afficher les réponses et les images
    questions.forEach((q, index) => {
      const userAnswer = userAnswers.find(answer => answer.question === q);
      let answerClass = "correct-recap";
      let questionStatus = "Correct";
      let recapImage = `<img src="${q.image}" alt="Image de l'avion" style="width: 100px; height: auto;" />`;
      let recapAnswer = `${q.bonneReponse}`;
      
      // Vérification de la réponse correcte ou incorrecte
      if (userAnswer) {
        if (userAnswer.answer !== q.bonneReponse) {
          answerClass = "incorrect-recap";
          questionStatus = "Mauvaise réponse";
          recapAnswer = `<span style="color: red;">${userAnswer.answer}</span><br><span style="color: green;">Bonne réponse: ${q.bonneReponse}</span>`;
        }
      }
  
      recapHtml += `
        <li class="${answerClass}" style="display: flex; align-items: center; margin-bottom: 15px;">
          <div style="flex: 1; display: flex; align-items: center;">
            ${recapImage}
            <span style="margin-left: 10px;">${questionStatus}: ${recapAnswer}</span>
          </div>
        </li>`;
    });
    
    recapHtml += "</ul>";
    document.getElementById('recap').innerHTML = recapHtml;
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
  }
  
  function rejouer() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    shuffleArray(questions); // Mélanger les questions avant de recommencer
    document.getElementById('score').innerText = `Score : 0 / ${questions.length}`;
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('end-screen').style.display = 'none';
    loadQuestion();
  }
  
  shuffleArray(questions); // Mélanger les questions avant de commencer
  loadQuestion();
  