let firstStart = +localStorage.getItem("gameStarted");
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const submitAnswer = document.getElementById('submitAnswer');
const timerText = document.getElementById('timer');
const mostRecentScore = +localStorage.getItem("mostRecentScore");
let gambelAmount = +localStorage.getItem("gambelChoice");
const SkipAnswer = document.getElementById('SkipAnswer');
let myDiv = document.getElementById('answersContainer');

scoreText.innerText = mostRecentScore;

let currentQuestion = {};
let acceptingAnswers = false;
let score = mostRecentScore;
let questionCounter;
let availableQuesions = [];
let skippedAnswers = [];
let skippedCount;
let selectedChoice;
let selectedAnswer;
let time;
let newTime;
let choiceContainer;
let answerCheck = [];

questions = [
    {
        question: "What is your name?",
        choice1: "Limor",
        choice2: "Liron",
        choice3: "Limon",
        choice4: "Lirom",
        answer: 1,
        feedback: "my name is Limor",
        tyep: "multiple",
        difficulty: 1
    },
    {
        question: "Where do you live?",
        choice1: "Arad",
        choice2: "Petah Tikva",
        choice3: "Hadera",
        choice4: "New York",
        answer: 2,
        feedback: "I live now in Petah Tikva",
        tyep: "multiple",
        difficulty: 2
    },
    {
        question: "What is your favorite color?",
        choice1: "Red",
        choice2: "Blue",
        choice3: "Purple",
        choice4: "Pink",
        answer: 3,
        feedback: "my favorite color is purple",
        tyep: "multiple",
        difficulty: 3
    }
    //{
    //    question: "What is your favorite food?",
    //    choice1: "Sushi",
    //    choice2: "Pizza",
    //    choice3: "Hamburger",
    //    choice4: "Noodles",
    //    answer: 1,
    //    feedback: "I can eat sushi all day every day",
    //    tyep: "multiple",
    //    difficulty: 3
    //},
    //{
    //    question: "How old are you?",
    //    choice1: "100",
    //    choice2: "25",
    //    choice3: "12",
    //    choice4: "27",
    //    answer: 4,
    //    feedback: "I am 27 years old",
    //    tyep: "multiple",
    //    difficulty: 1
    //}
]

//CONSTANTS
const CORRECT_BONUS = gambelAmount;
let QuestionNum = [...questions];
const MAX_QUESTIONS = QuestionNum.length;


startGame = () => {
        questionCounter = 0;
    availableQuesions = [...questions];
    localStorage.setItem("availableQuesions", JSON.stringify(availableQuesions));
    startTimer();
    getNewQuestion();
};

startTimer = () => {
    setTimeout(() => {
        const min = Math.floor(time / 60);
        let sec = time % 60;
        timerText.innerText = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        time--;
        if (min == 0) {
            if (sec <= 2) {
                localStorage.setItem("mostRecentScore", score);
                return window.location.assign('/end.html');
            }   
        }
        startTimer();
    }, 1000);
}

getNewQuestion = () => {
    questionCounter = +localStorage.getItem("questionCounter");
    availableQuesions = JSON.parse(localStorage.getItem("availableQuesions"));
    checkQuestions();
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;

    let questionIndex;
    if (SkipAnswer.disabled != true) {
        // random
        questionIndex = Math.floor(Math.random() * availableQuesions.length);
        currentQuestion = availableQuesions[questionIndex];
    }
    else {
        skippedCount = +localStorage.getItem("skippedCount");
        currentQuestion = availableQuesions[skippedCount - 1];
        alert("skipp num "+ skippedCount);
        skippedCount--;
        localStorage.setItem("skippedCount", skippedCount);
        SkipAnswer.disabled = true
    }
    question.innerText = currentQuestion.question;
    acceptingAnswers = true;

    //creat answers
    for (let i = 1; i < 5; i++) {
        choiceContainer = document.createElement(`div`);
        choiceContainer.className = 'choiceContainer';
        choiceContainer.id = 'choiceContainer'+i;
        const myChoice = choiceContainer.appendChild(document.createElement(`p`));
        myChoice.className = `choice-text`;
        myChoice.dataset = i;
        myChoice.appendChild(document.createTextNode(currentQuestion['choice' + i]));
        myDiv.appendChild(choiceContainer);

        myChoice.addEventListener('click', (e) => {
            if (!acceptingAnswers) {
                selectedChoice.parentElement.classList.remove("chosenAnswer");
            }

            acceptingAnswers = false;
            selectedChoice = e.target;
            selectedAnswer = i;

            selectedChoice.parentElement.classList.add("chosenAnswer");
            submitAnswer.disabled = !selectedChoice;
        });
    }
    availableQuesions.splice(questionIndex, 1);
    localStorage.setItem("availableQuesions", JSON.stringify(availableQuesions));
  };

saveAnawer = (e) => {
    newTime = time;
    localStorage.setItem("timeLeft", newTime);
    questionCounter++;
    localStorage.setItem("questionCounter", questionCounter);

    submitAnswer.disabled = true;
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply == "correct") {
        incremenScore(CORRECT_BONUS);
    }
    else {
        decremenScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.remove("chosenAnswer");

    // feedback
    const feedbackAns = {
        question: currentQuestion.question,
        answers: {
            answer1: currentQuestion.choice1,
            answer2: currentQuestion.choice2,
            answer3: currentQuestion.choice3,
            answer4: currentQuestion.choice4
        },
        correctAns: currentQuestion.answer,
        feedback: currentQuestion.feedback,
        isCorrect: classToApply,
        selectedAnswer: selectedAnswer
    };
    answerCheck.push(feedbackAns);
    localStorage.setItem("answerCheck", JSON.stringify(answerCheck));
 
    selectedChoice.parentElement.classList.add(classToApply);
 
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        removeAns();
        checkQuestions();
        if (questionCounter == MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);
            return window.location.assign('/end.html');
        }
        else {
            window.location.assign('/WheelOfFortiune.html');

        }
    }, 1000);

    // update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
        
}

removeAns = () => {
    for (let i = 1; i < 5; i++) {
        const answersToRemove = document.getElementById('choiceContainer' + i);
        myDiv.removeChild(answersToRemove);
    }
}

checkQuestions = () => {
    if (availableQuesions.length == 0) {
        skippedAnswers = JSON.parse(localStorage.getItem("skippedAnswers"));
        availableQuesions = skippedAnswers;
        SkipAnswer.disabled === true;
    }
}

SkipAnawer = () => {
    skippedAnswers[skippedCount] = currentQuestion;
    localStorage.setItem("skippedAnswers", JSON.stringify(skippedAnswers));
    skippedCount++;
    alert(skippedCount);
    localStorage.setItem("skippedCount", skippedCount);

    selectedChoice.parentElement.classList.remove("chosenAnswer");
    removeAns();
    window.location.assign('/WheelOfFortiune.html');
}

incremenScore = num => {
    score += num;
    scoreText.innerText = score;
    localStorage.setItem("mostRecentScore", score);
};

decremenScore = num => {
    score -= num;
    scoreText.innerText = score;
    localStorage.setItem("mostRecentScore", score);
};

if (firstStart == 1) {
    questionCounter = 0;
    localStorage.setItem("questionCounter", questionCounter);
    skippedCount = 0;
    localStorage.setItem("skippedCount", skippedCount);
    skippedAnswers = [];
    localStorage.setItem("skippedAnswers", skippedAnswers);
    time = +localStorage.getItem("timeLeft");
    startGame();
    localStorage.setItem("gameStarted", 0);
    firstStart = +localStorage.getItem("gameStarted");

} else {
    getNewQuestion();
    time = +localStorage.getItem("timeLeft");
    questionCounter = +localStorage.getItem("questionCounter");
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    skippedCount = +localStorage.getItem("skippedCount");
    skippedAnswers = JSON.parse(localStorage.getItem("skippedAnswers"));
    answerCheck = JSON.parse(localStorage.getItem("answerCheck"))
    startTimer();
}

