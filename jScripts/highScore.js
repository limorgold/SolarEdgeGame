const highScoreList = document.getElementById('highScoreList');
const playerName = document.getElementById('playerName');
const getPlayerName = JSON.parse(localStorage.getItem("userName"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


playerName.innerText += " " + getPlayerName;

highScores.sort((a, b) => b.score - a.score);
highScores.splice(3);

highScoreList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");