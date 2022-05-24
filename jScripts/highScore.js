const highScoreList = document.getElementById('highScoreList');
const gameTime = document.getElementById('gameTime');
const playerName = document.getElementById('playerName');
const getPlayerName = JSON.parse(localStorage.getItem("userName"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let time = +localStorage.getItem("timeLeft");

playerName.innerText += " " + getPlayerName;

highScores.sort((a, b) => b.score - a.score);
highScores.splice(3);

highScoreList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");

setTime = () => {
    const min = Math.floor(time / 60);
    let sec = time % 60;
    gameTime.innerText = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
}

setTime();