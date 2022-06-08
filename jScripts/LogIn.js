const employeeName = document.getElementById('employeeName');
const employeeEmail = document.getElementById('employeeEmail');
const StartGame = document.getElementById('StartGame');
const ErrorHelp = document.getElementById('ErrorHelp');

employeeName.addEventListener('keyup', () => {
    employeeEmail.addEventListener('keyup', () => {
        StartGame.disabled = !employeeEmail.value;
    });
});



StartTheGame = (e) => {

    e.preventDefault();

    if (employeeName.value != null && !employeeEmail.value != null) {
        window.location.href = "OpeningPage.html";
        localStorage.setItem("userName", JSON.stringify(employeeName.value));
        localStorage.setItem("mostRecentScore", 0);
        localStorage.setItem("gameStarted", 1);
        localStorage.setItem("timeLeft", 60);
    }
    else {
        ErrorHelp.innerText = "Plese enter your full name and Email";
    }
}
