

const saveScoreBtn = document.getElementById('saveScoreBtn');

const finalScore = document.getElementById('finalScore');

const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const userName = JSON.parse(localStorage.getItem("userName")) || [];


finalScore.innerText = mostRecentScore;

const score = {
    score: mostRecentScore,
    name: userName
};
highScores.push(score);
localStorage.setItem("highScores", JSON.stringify(highScores));

saveHighScore = (e) => {
    e.preventDefault();

    
    window.location.assign("OpeningPage.html");
}


// leaderboard //
const userLucationList = document.getElementById('userLucationList');

highScores.sort((a, b) => b.score - a.score);
highScores.splice(5);
userLucationList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");


// three best //
const highScoreList = document.getElementById('highScoreList2');

highScores.sort((a, b) => b.score - a.score);
highScores.splice(3);
highScoreList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");
