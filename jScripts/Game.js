
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
let questionCounter = 0;
let availableQuesions = [];
let skippedAnswers = [];
let skippedCount = 0;
let selectedChoice;
let selectedAnswer;
let timer = 1;
let time = timer * 60;
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
    },
    {
        question: "What is your favorite food?",
        choice1: "Sushi",
        choice2: "Pizza",
        choice3: "Hamburger",
        choice4: "Noodles",
        answer: 1,
        feedback: "my name is Limor",
        tyep: "multiple",
        difficulty: 3
    },
    {
        question: "How old are you?",
        choice1: "100",
        choice2: "25",
        choice3: "12",
        choice4: "27",
        answer: 4,
        feedback: "I am 27 years old",
        tyep: "multiple",
        difficulty: 1
    }
]

//CONSTANTS
const CORRECT_BONUS = gambelAmount;
let QuestionNum = [...questions];
const MAX_QUESTIONS = QuestionNum.length;

startGame = () => {
        questionCounter = 0;
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
    if (availableQuesions.length == 0) {
        availableQuesions = skippedAnswers;
        SkipAnswer.disabled = true;
        if (questionCounter == MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);
            //go to the end page
            return window.location.assign('/end.html');
        }
    }

    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;

    // random
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];

    question.innerText = currentQuestion.question;

    availableQuesions.splice(questionIndex, 1);
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
};

saveAnawer = (e) => {

    questionCounter++;

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
        for (let i = 1; i < 5; i++) {
            const answersToRemove = document.getElementById('choiceContainer' + i);
            myDiv.removeChild(answersToRemove);
        }
        getNewQuestion();
                //wheel of fortune her!!!
       // window.location.assign('/WheelOfFortiune.html'); 
    }, 1000);



    // update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

}

SkipAnawer = (e) => {

    skippedAnswers[skippedCount] = currentQuestion; 
    skippedCount++;
    selectedChoice.parentElement.classList.remove("chosenAnswer");

    getNewQuestion();
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

decremenScore

startGame();