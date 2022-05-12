const employeeNumber = document.getElementById('employeeNumber');
const GameCode = document.getElementById('GameCode');
const StartGame = document.getElementById('StartGame');
const ErrorHelp = document.getElementById('ErrorHelp');

let myUsers = [];

employeeNumber.addEventListener('keyup', () => {
    GameCode.addEventListener('keyup', () => {
        StartGame.disabled = !GameCode.value;
    });
});

users = [

    {
        name: "Limor",
        employeeNum: "112233",
        department: "L&D",
        userGames: [
            "1111",
            "2222"
        ]
    },
    {
        name: "Liron",
        employeeNum: "223344",
        department: "L&D",
        userGames: [
            "1111",
            "3333"
        ]

    },
    {
        name: "Yotam",
        employeeNum: "334455",
        department: "consultant",
        userGames: [
            "2222",
            "4444"
        ]
    },
    {
        name: "Roi",
        employeeNum: "445566",
        department: "UX/UI",
        userGames: [
            "1111",
            "3333"
        ]
    }
]

StartTheGame = (e) => {

    myUsers = [...users];

    myUsers.forEach(function (myUser) {
        e.preventDefault();
        if (myUser.employeeNum == employeeNumber.value) {
            const userName = myUser.name;
            myUser.userGames.forEach(function (gameCode) {
                if (GameCode.value == gameCode) {
                    
                    window.location.href = "OpeningPage.html";
                    localStorage.setItem("userName", JSON.stringify(userName));

                }
                else {
                    
                    ErrorHelp.innerText ="You are not associated with this game";
                }

            });
        }
        else {
            
            ErrorHelp.innerText ="The employee number is incorrect";
        }
    });
    
}
