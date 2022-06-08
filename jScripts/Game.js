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
const QuestionPicDiv = document.getElementById("QuestionPic");

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
let QuestionPic;

questions = [
    {
        question: "What is your name?",
        QuestionPic: "",
        choice1: "Limor",
        choiceImg1: "",
        choice2: "Liron",
        choiceImg2: "",
        choice3: "Limon",
        choiceImg3: "",
        choice4: "Lirom",
        choiceImg4: "",
        answer: 1,
        feedback: "my name is Limor",
        tyep: "multiple",
        difficulty: 1
    },
    {
        question: "Where do you live?",
        QuestionPic: "",
        choice1: "Arad",
        choiceImg1: "",
        choice2: "Petah Tikva",
        choiceImg2: "",
        choice3: "Hadera",
        choiceImg3: "",
        choice4: "New York",
        choiceImg4: "",
        answer: 2,
        feedback: "I live now in Petah Tikva",
        tyep: "multiple",
        difficulty: 2
    },
    {
        question: "What is your favorite food?",
        QuestionPic: "/Imeg/food.jpg",
        choice1: "",
        choiceImg1: "/Imeg/sushi.jpg",
        choice2: "",
        choiceImg2: "/Imeg/pizza.jpg",
        choice3: "Hamburger",
        choiceImg3: "",
        choice4: "Noodles",
        choiceImg4: "",
        answer: 1,
        feedback: "I can eat sushi all day every day",
        tyep: "multiple",
        difficulty: 3
     }
    //{
    //    question: "What is your favorite color?",
    //    choice1: "Red",
    //    choice2: "Blue",
    //    choice3: "Purple",
    //    choice4: "Pink",
    //    answer: 3,
    //    feedback: "my favorite color is purple",
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
                const classToApply = "incorrect";
                endFeedback(classToApply);
                questionCounter++;
                localStorage.setItem("mostRecentScore", score);
                for (let i = 0; i < availableQuesions.length; i++) {
                    currentQuestion = availableQuesions[i]
                    const classToApply = "incorrect";
                    endFeedback(classToApply);
                }
                if (skippedCount > 0) {
                    for (let i = 0; i < skippedCount; i++) {
                        currentQuestion = skippedAnswers[i];
                        const classToApply = "incorrect";
                        endFeedback(classToApply);
                    }
                }
                return window.location.assign('/end.html');
            }   
        }
        startTimer();
    }, 1000);
}

getNewQuestion = () => {
    questionCounter = +localStorage.getItem("questionCounter");
    availableQuesions = JSON.parse(localStorage.getItem("availableQuesions"));
    checkSkip();
    
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
        skippedCount--;
        localStorage.setItem("skippedCount", skippedCount);
        SkipAnswer.disabled = true
    }
    question.innerText = currentQuestion.question;
    if (currentQuestion.QuestionPic != "") {
        QuestionPic = document.createElement("img");
        QuestionPic.src = currentQuestion.QuestionPic;
        QuestionPic.setAttribute("style", "width:150px")
        QuestionPicDiv.appendChild(QuestionPic);
    }
    acceptingAnswers = true;

    //creat answers
    for (let i = 1; i < 5; i++) {
        choiceContainer = document.createElement(`div`);
        choiceContainer.className = 'choiceContainer';
        choiceContainer.id = 'choiceContainer'+i;
        const myChoice = choiceContainer.appendChild(document.createElement(`p`));
        myChoice.className = `choice-text`;
        myChoice.dataset = i;
        if (currentQuestion['choice' + i] == "") {

            const choiceImg = document.createElement("img");
            choiceImg.src = currentQuestion['choiceImg' + i];
            choiceImg.setAttribute("style", "width:150px");
            myChoice.appendChild(choiceImg);
        }
        else {
            myChoice.appendChild(document.createTextNode(currentQuestion['choice' + i]));
        }
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
    
    submitAnswer.disabled = true;
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply == "correct") {
        incremenScore(CORRECT_BONUS);
    }
    else {
        decremenScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.remove("chosenAnswer");

    endFeedback(classToApply);
    questionCounter++;
    localStorage.setItem("questionCounter", questionCounter);

    selectedChoice.parentElement.classList.add(classToApply);
 
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        removeAns();

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

checkSkip = () => {
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
    localStorage.setItem("skippedCount", skippedCount);
    removeAns();
    window.location.assign('/WheelOfFortiune.html');
}

endFeedback = (classToApply) => {
    if (questionCounter > 0) {
        answerCheck = JSON.parse(localStorage.getItem("answerCheck"));
    }
    const feedbackAns = {
        currentQuestion,
        isCorrect: classToApply,
        selectedAnswer: selectedAnswer
    }
    answerCheck.push(feedbackAns);
    localStorage.setItem("answerCheck", JSON.stringify(answerCheck));
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
    answerCheck = [];
    localStorage.setItem("answerCheck", answerCheck);
    time = +localStorage.getItem("timeLeft");
    startGame();
    localStorage.setItem("gameStarted", 2);
}
else {
    time = +localStorage.getItem("timeLeft");
    startTimer();
    getNewQuestion();
    questionCounter = +localStorage.getItem("questionCounter");
    progressText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    skippedCount = +localStorage.getItem("skippedCount");
    skippedAnswers = JSON.parse(localStorage.getItem("skippedAnswers"));
    answerCheck = JSON.parse(localStorage.getItem("answerCheck"));
}