const sectors = [
    { color: "#4AEC96", label: 700 },
    { color: "#FF6E1F", label: 100 },
    { color: "#EDF8FE", label: 200 },
    { color: "#FF3130", label: 400 },
    { color: "#4AEC96", label: 700 },
    { color: "#FF6E1F", label: 100 },
    { color: "#EDF8FE", label: 200 },
    { color: "#FF3130", label: 400 },
];

const rand = (m, M) => Math.random() * (M - m) + m;
const tot = sectors.length;
const wheelScore = document.getElementById("wheelScore");
const wheel = document.getElementById("wheel").getContext('2d');
const dia = wheel.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / sectors.length;
let score = +localStorage.getItem("mostRecentScore");

const Continue = document.getElementById("Continue");
const spinBTN = document.getElementById("spinBTN");

const friction = 0.98;  // speed
let angVel = 0; // Angular velocity
let ang = 0; // Angle in radians

const getIndex = () => Math.floor(tot - ang / TAU * tot) % tot;

// creat wheel
function drawSector(sector, i) {
    const ang = arc * i;
    wheel.save();
    // COLOR
    wheel.beginPath();
    wheel.fillStyle = sector.color;
    wheel.moveTo(rad, rad);
    wheel.arc(rad, rad, rad, ang, ang + arc);
    wheel.lineTo(rad, rad);
    wheel.fill();
    // TEXT
    wheel.translate(rad, rad);
    wheel.rotate(ang + arc / 2);
    wheel.textAlign = "right";
    wheel.fillStyle = "#001546";
    wheel.font = "bold 30px sans-serif";
    wheel.fillText(sector.label, rad - 10, 10);
    wheel.restore();
};


function rotate() {
    wheel.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
}

function frame() {
    if (!angVel) return;
    angVel *= friction; // Decrement velocity by friction
    if (angVel < 0.002) {
        angVel = 0; // Bring to stop
        const sector = sectors[getIndex()];
        //score += sector.label;
        wheelScore.innerText += "Score: " + sector.label;
        score += sector.label;
        Continue.disabled = false;
        spinBTN.disabled = true;

    }
    ang += angVel; // Update angle
    ang %= TAU; // Normalize angle
    
    rotate();
}

function engine() {
    frame();
    requestAnimationFrame(engine)
}

// INIT
sectors.forEach(drawSector);
rotate(); // Initial rotation
engine(); // Start engine


wheelRotate = () => {
    if (!angVel) angVel = rand(0.25, 0.35);
}

goToGame = () => {
    localStorage.setItem("mostRecentScore", score);
    window.location.assign('/Gambelin.html');
}