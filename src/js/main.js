// CANVAS
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");
$canvas.width = $canvas.getBoundingClientRect().width;
$canvas.height = $canvas.getBoundingClientRect().height;
// DISPLAY SCORE
const $score = document.querySelector("#score");
const $brickBroken = document.querySelector("#brick-broken");

const radiusBall = 10, barWidth = 100, barHeight = 10,
nbCol = 8, nbRow = 5, widthBrick = 75, heightBrick = 20;

let x = $canvas.width / 2, y = $canvas.height - 30,
barX = ($canvas.width - barWidth) / 2, end = false,
speedX = 5, speedY = -5, result = 0;

const drawBall = () =>{

    ctx.beginPath();
    ctx.arc(x, y, radiusBall, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();

}

const drawBar = () =>{

    ctx.beginPath();
    ctx.rect(barX, $canvas.height - barHeight - 2, barWidth, barHeight);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}

const bricks = [];

for(let i = 0; i < nbRow; i++){
    
    bricks[i] = [];
    
    for(let j = 0; j < nbCol; j++){
        bricks[i][j] = {x: 0, y: 0, status: 1};
    }

}

const drawBricks = () => {

    for(let i = 0; i < nbRow; i++){
        for(let j = 0; j < nbCol; j++){

            if(bricks[i][j].status === 1){
                let brickX = (j * (widthBrick + 10) + 35 );
                let brickY = (i * (heightBrick + 10) + 30 );

                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, widthBrick, heightBrick);
                ctx.fillStyle = "#333";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

const brokenBrick = () => {

    for(let i = 0; i < nbRow; i++){
        for(let j = 0; j < nbCol; j++){

            let currentBrick = bricks[i][j];

            if(currentBrick.status === 1){

                if(x > currentBrick.x &&
                   x < currentBrick.x + widthBrick &&
                   y > currentBrick.y &&
                   y < currentBrick.y + heightBrick){

                    speedY = -speedY;
                    currentBrick.status = 0;
                    result ++;
                    $brickBroken.textContent = result;

                    if(result === nbRow * nbCol){
                        const victory = "<span id='victory'><br>Bravo ! <br>Clique sur le casse-brique pour rejouer</span>"
                        $score.innerHTML += victory; 
                        end = true;
                    }
                }
            }
        }
    }
}

const draw = () => {

    if(!end){
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);
        drawBall();
        drawBar();
        drawBricks();
        brokenBrick();

        if(x + speedX > $canvas.width - radiusBall || 
           x + speedX < radiusBall) speedX = -speedX;
 
        if(y + speedY < radiusBall) speedY = -speedY;

        if(y + speedY > $canvas.height - radiusBall){
            if(x > barX && x < barX + barWidth){
                speedX = speedX + 0.1;
                speedY = speedY + 0.1;
                speedY = -speedY;
            } else {
                end = true;
                const gameOver = "<span id='fail'><br>Perdu ! <br>Clique sur le casse-brique pour rejouer</span>"
                $score.innerHTML += gameOver; 
            }
        }
            

        x += speedX;
        y += speedY;

        requestAnimationFrame(draw);
    }
}

draw();

const moveMouse = e => {
    let posXBarCanvas = e.clientX - $canvas.offsetLeft;
    
    if(posXBarCanvas > 35 && posXBarCanvas < $canvas.width - 35){
        barX = posXBarCanvas - barWidth / 2;
    }
}

document.addEventListener("mousemove", moveMouse);

$canvas.addEventListener("click", () => {
    if(end){
        end = false;
        document.location.reload();
    }
});