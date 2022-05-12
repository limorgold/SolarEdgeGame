
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const submitAnswer = document.getElementById('submitAnswer');
const timerText = document.getElementById('timer');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let skippedAnswers = [];
let skippedCount = 0;
let selectedChoice;
let selectedAnswer;
let timer = 1;
let time = timer * 60;

questions = [

    {
        question: "What is your name?",
        choice1: "Limor",
        choice2: "Liron",
        choice3: "Limon",
        choice4: "Lirom",
        answer: 1

    },
    {
        question: "Where do you live?",
        choice1: "Arad",
        choice2: "Petah Tikva",
        choice3: "Hadera",
        choice4: "New York",
        answer: 2

    },
    {
        question: "What is your favorite color?",
        choice1: "Red",
        choice2: "Blue",
        choice3: "Purple",
        choice4: "Pink",
        answer: 3


    },
    {
        question: "What is your favorite food?",
        choice1: "Sushi",
        choice2: "Pizza",
        choice3: "Hamburger",
        choice4: "Noodles",
        answer: 1


    },
    {
        question: "How old are you?",
        choice1: "100",
        choice2: "25",
        choice3: "12",
        choice4: "27",
        answer: 4
    }
]

//CONSTANTS
const CORRECT_BONUS = 10;
let QuestionNum = [...questions];
const MAX_QUESTIONS = QuestionNum.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    stertTimer();
};

stertTimer = () => {
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
        stertTimer();
    }, 1000);

}


getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;

    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;

    // random
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;

};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {

        if (!acceptingAnswers) {
            selectedChoice.parentElement.classList.remove("chosenAnswer");

        }

        acceptingAnswers = false;
         selectedChoice = e.target;
        selectedAnswer = selectedChoice.dataset['number'];

        selectedChoice.parentElement.classList.add("chosenAnswer");

        submitAnswer.disabled = !selectedChoice;

        
    });
});

saveAnawer = (e) => {
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply == "correct") {
        incremenScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.remove("chosenAnswer");

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();

    }, 1000);



    // update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


}

SkipAnawer = (e) => {

    //skippedAnswers += [...currentQuestion];

    //skippedAnswers[skippedCount][0] += currentQuestion.question;
    //skippedAnswers[skippedCount][1] += currentQuestion.answer;

    //skippedCount++;

    //choices.forEach((choice) => {
    //    const number = choice.dataset['number'];
    //    choice.innerText = currentQuestion['choice' + number];
    //});


   console.log(skippedAnswers);
  
    getNewQuestion();

}

incremenScore = num => {
    score += num;
    scoreText.innerText = score;
};



startGame();