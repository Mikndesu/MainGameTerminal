var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height + 40;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var points = 0;
var max_point = 0;

var background = new Image();
background.src = "/images/breakout_back_ground.jpg";

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    if (r == brickRowCount - 1) {
      bricks[c][r] = { x: 0, y: 0, status: 2 };
    } else {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}

function calcu_max() {
  for (var i = 0; i < brickColumnCount; i++) {
    for (var l = 0; l < brickRowCount; l++) {
      if (bricks[i][l].status == 1) {
        max_point++;
      } else if (bricks[i][l].status == 2) {
        max_point++;
        max_point++;
      }
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          points++;
        }
      } else if (b.status == 2) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 1;
          points = points + 2;
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#6699CC";
        ctx.fill();
        ctx.closePath();
      } else if (bricks[c][r].status == 2) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#F34D22";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, background.height * canvas.width / background.width);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  }
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      if (y = y - paddleHeight) {
        dy = -dy;
      }
    }
    else {
      console.log(points * 10)
      ctx.font = 'bold 30pt sans-serif';
      ctx.strokeText('Game Over...', 130, 200);
      ctx.font = 'bold 23pt sans-serif';
      ctx.strokeText('Score : ' + points * 10, 180, 160);
      clearInterval(interval);
      sendPoints();
    }
  }

  if (max_point == points) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 30pt sans-serif';
    ctx.strokeText('Game Clear !!!', 130, 200);
    ctx.font = 'bold 23pt sans-serif';
    ctx.strokeText('Score Max!', 180, 160);
    clearInterval(interval);
    sendPoints();
    console.log("Clear!")
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  sendPoints();
}

function sendPoints() {
  document.getElementById("score").value = (points * 10);
}

onclickfun = function () {
  setTimeout(inter, 3000);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  calcu_max();
}

var interbal;

function inter() {
  interval = setInterval(draw, 5);
}