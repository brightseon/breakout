const RIGHT_KEYS = ['ArrowRight', 'Right'];
const LEFT_KEYS = ['ArrowLeft', 'Left'];
const PADDLE_STEP = 7;
const WINNING_MESSAGE = 'YOU WIN, CONGRATULATIONS!';

const canvas = document.getElementById('canvas');
const startButton = document.getElementById('start');
const ctx = canvas.getContext('2d');

const ballRadius = 10;
const paddleWidth = 75;
const paddleHeight = 10;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];

let score = 0;
let paddleX = (canvas.width - paddleWidth) / 2;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let rightPressed = false;
let leftPressed = false;
let interval;

for (let r = 0; r < brickRowCount; r++) {
    bricks[r] = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[r][c] = { x: 0, y: 0, status: 1 };
    }
}

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

function drawBricks() {
    for (let r = 0; r < brickRowCount; r++) {
        for (let c = 0; c < brickColumnCount; c++) {
            const brick = bricks[r][c];

            if (brick.status === 0) continue;

            const brickX = brickOffsetLeft + (brickWidth + brickPadding) * c;
            const brickY = brickOffsetTop + (brickHeight + brickPadding) * r;

            brick.x = brickX;
            brick.y = brickY;

            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = '#0095DD';
            ctx.fill();
            ctx.closePath();
        }
    }
}

function collisionDetection() {
    for (let r = 0; r < brickRowCount; r++) {
        for (let c = 0; c < brickColumnCount; c++) {
            const brick = bricks[r][c];

            if (brick.status === 1) {
                if (
                    brick.x + ballRadius < x &&
                    x < brick.x + brickWidth + ballRadius &&
                    brick.y + ballRadius < y &&
                    y < brick.y + brickHeight + ballRadius
                ) {
                    brick.status = 0;
                    dy = -dy;
                    score += 1;

                    if (score === brickRowCount * brickColumnCount) {
                        alert(WINNING_MESSAGE);
                        document.location.reload;
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Score: ${score}`, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawPaddle();
    collisionDetection();
    drawBricks();
    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    }

    if (rightPressed) {
        paddleX = Math.min(canvas.width - paddleWidth, paddleX + PADDLE_STEP);
    }

    if (leftPressed) {
        paddleX = Math.max(0, paddleX - PADDLE_STEP);
    }

    if (y + dy > canvas.height - ballRadius) {
        if (paddleX < x && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            clearInterval(interval);
            alert('Game Over!');
        }
    }

    x += dx;
    y += dy;
}

function startGame() {
    interval = setInterval(draw, 10);
}

startButton.addEventListener('click', () => {
    startGame();
    startButton.disabled = true;
});

function mouseMoveHandler(e) {
    paddleX = e.clientX - canvas.offsetLeft - paddleWidth / 2;

    if (paddleX < 0) {
        paddleX = 0;
    }

    if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
    }
}

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

canvas.addEventListener('mousemove', mouseMoveHandler, false);
