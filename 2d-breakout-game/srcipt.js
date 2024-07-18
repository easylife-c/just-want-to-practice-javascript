const Canvas = document.getElementById("myCanvas");
const ctx = Canvas.getContext("2d");

let x = Canvas.width / 2;
let y  = Canvas.height - 30;
let dx = 2;
let dy = -2;
const ball =ballRadius = 10;
const paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (Canvas.width - paddleWidth) /2;
let rightpressed = false;
let leftpressed = false;
let score = 0;
let lives = 3;

// setting up the brick
const brickRowcount = 3;
const brickColumnCount = 5;
const brickwidth = 75;
const brickheight = 20;
const brickpadding = 10;
const brickoffsettop = 30;
const brickoffsetleft = 30;
const bricks = [];

for (let c=0; c < brickColumnCount; c++){
    bricks[c] = [];
    for (let r = 0; r < brickRowcount; r++) {
        bricks[c][r]= {x: 0, y: 0,status:1} ;
       }
}
console.log(bricks);

function drawlives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`lives: ${lives}`,Canvas.width - 65,20);
}

function drawscore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`score: ${score}`,8,20);
}

function collisiondectection(){
    for (let c=0; c < brickColumnCount; c++){
        for (let r = 0; r < brickRowcount; r++) {
            const b = bricks[c][r];
            if (b.status === 1){
                if (x > b.x && x < b.x + brickwidth && y > b.y && y < b.y + brickheight){
                    dy = -dy;
                    b.status =0;
                    score++;
                    paddleWidth-=2.5
                    if (score === brickColumnCount*brickRowcount) {
                        alert("you win!")
                        document.location.reload();
                        //clearInterval(interval);

                    }
            }

            }
        }
    }
}

function drawbricks(){
    for (let c = 0; c < brickColumnCount; c++){
        for (let r = 0; r < brickRowcount; r++){
            if (bricks[c][r].status ===1){
                const brickX = c* (brickwidth+brickpadding)+ brickoffsetleft;
                const brickY = r* (brickheight+brickpadding)+ brickoffsettop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX ,brickY,brickwidth,brickheight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();

            }

        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, Canvas.height - paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI * 2, false);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0,0,Canvas.width,Canvas.height);
    drawBall();
    drawPaddle();
    drawbricks();
    collisiondectection();
    drawscore();
    drawlives()

    if ( y + dy < ballRadius) {
        dy = -dy; 
    } else if (y + dy > Canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy=-dy;
        } else{
            lives--;
            if (!lives){
        alert("Game over");
        document.location.reload();
        //clearInterval(interval);

            } else {
                x = Canvas.width / 2;
                y = Canvas.height-30;
                dx = 2; 
                dy = -2;
                paddleX = (Canvas.width - paddleWidth) /2;
            }
        }
    }
    if (x + dx > Canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (rightpressed) {
        paddleX = Math.min(paddleX + 7 , Canvas.width - paddleWidth);
        console.log(paddleX);

    } else if (leftpressed) {
        paddleX =Math.max(paddleX - 7, 0);
        console.log(paddleX)
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);

}

draw();

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightpressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftpressed = true;
    } 
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightpressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftpressed = false;
    } 
}


function mouseMoveHandler (e){
    const relativeX = e.clientX - Canvas.offsetLeft;
    if (relativeX > 0 && relativeX < Canvas.width){
        paddleX = relativeX- paddleWidth /2;

    }
    console.log(relativeX)
}