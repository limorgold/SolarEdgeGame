
const answerCheck = JSON.parse(localStorage.getItem("answerCheck")) || [];
const answerCheckTxt = document.getElementById('answerCheck');
answerCheckTxt.innerHTML = answerCheck
    .map(feedbackAns => {

        return `<div class="${feedbackAns.isCorrect} ">
                <div class="accordion">${feedbackAns.currentQuestion.question}
                 <img src="${feedbackAns.currentQuestion.QuestionPic}" style="width:80px" />
                </div>
                <div class="panel">
                <div>${feedbackAns.currentQuestion.feedback}</div>
                <img src="${feedbackAns.currentQuestion.choiceImg1}" style="width:80px" />
                <div>${feedbackAns.currentQuestion.choice1}</div>
                <img src="${feedbackAns.currentQuestion.choiceImg2}" style="width:80px" />
                <div>${feedbackAns.currentQuestion.choice2}</div>
                <img src="${feedbackAns.currentQuestion.choiceImg3}" style="width:80px" />
                <div>${feedbackAns.currentQuestion.choice3}</div>
                <img src="${feedbackAns.currentQuestion.choiceImg4}" style="width:80px" />
                <div>${feedbackAns.currentQuestion.choice4}</div>
                <span class="rightAns">${feedbackAns.currentQuestion.answer}</span>
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

//const isCorrect = document.getElementsByClassName("rightAns");
//answerCheck.innerText = isCorrect;

//const isIncorrect = document.getElementsByClassName("incorrect");
//const mytry = [];
//mytry += isCorrect.getAttribute('isRight');
//alert(mytry[0]);

//const myTry = document.getElementById('myTry');
//const try1 = myTry.getAttribute('isRight');
//alert(try1);