
const answerCheck = JSON.parse(localStorage.getItem("answerCheck")) || [];
const answerCheckTxt = document.getElementById('answerCheck');
answerCheckTxt.innerHTML = answerCheck
    .map(feedbackAns => {

        return `<div class="${feedbackAns.isCorrect} ">
                <div class="accordion">${feedbackAns.question}</div>
                <div class="panel">
                <div>${feedbackAns.feedback}</div>
                <div>${feedbackAns.answers.answer1}</div>
                <div>${feedbackAns.answers.answer2}</div>
                <div>${feedbackAns.answers.answer3}</div>
                <div>${feedbackAns.answers.answer4}</div>
                <span class="rightAns">${feedbackAns.correctAns}</span>
                <span class="rightAns">${feedbackAns.selectedAnswer}</span>
                </div> </div>`; 
    })
    .join("");

var questions = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < questions.length; i++) {
    questions[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

const isCorrect = document.getElementsByClassName("rightAns");
//answerCheck.innerText = isCorrect;

//const isIncorrect = document.getElementsByClassName("incorrect");
//const mytry = [];
//mytry += isCorrect.getAttribute('isRight');
//alert(mytry[0]);

//const myTry = document.getElementById('myTry');
//const try1 = myTry.getAttribute('isRight');
//alert(try1);