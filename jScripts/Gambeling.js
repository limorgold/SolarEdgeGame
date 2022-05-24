const gambelOptions = document.getElementById('gambelOptions');
const gambelContinue = document.getElementById('gambelContinue');
let choosenGambel = document.getElementById('choosenGambel');
let score = +localStorage.getItem("mostRecentScore");
let newScore = document.getElementById('colectedScore');

newScore.innerText = "score: " + score;

function gambelChoice() {
    let gambelChoice = gambelOptions.options[gambelOptions.selectedIndex].text
    if (score >= +gambelChoice) {
        choosenGambel.innerText = gambelOptions.options[gambelOptions.selectedIndex].text;
        gambelContinue.disabled = false;
    }
    else {
        choosenGambel.innerText = "not enough points";
        gambelContinue.disabled = true;
    }
    
}

function gambelToContinue() {
    localStorage.setItem("gambelChoice", choosenGambel.innerText);
    window.location.assign('/Game.html');
}