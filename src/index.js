const RIGHT_KEYS = ['ArrowRight', 'Right'];
const LEFT_KEYS = ['ArrowLeft', 'Left'];
const PADDLE_STEP = 7;

const canvas = document.getElementById('canvas');
const startButton = document.getElementById('start');
const ctx = canvas.getContext('2d');

const ballRadius = 10;
const paddleWidth = 75;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let rightPressed = false;
let leftPressed = false;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    if (rightPressed) {
        paddleX = Math.min(canvas.width - paddleWidth, paddleX + PADDLE_STEP);
    }

    if (leftPressed) {
        paddleX = Math.max(0, paddleX - PADDLE_STEP);
    }

    x += dx;
    y += dy;
}

function startGame() {
    setInterval(draw, 10);
}

startButton.addEventListener('click', () => {
    startGame();
    startButton.disabled = true;
});

document.addEventListener('keydown', (e) => {
    if (RIGHT_KEYS.includes(e.key)) {
        rightPressed = true;
    }

    if (LEFT_KEYS.includes(e.key)) {
        leftPressed = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (RIGHT_KEYS.includes(e.key)) {
        rightPressed = false;
    }

    if (LEFT_KEYS.includes(e.key)) {
        leftPressed = false;
    }
});
