/**
 * Instance of brick-breaker's game
 * @class Game
 */
export default class Game{

    radiusBall = 10;
    barWidth = 100;
    barHeight = 10;
    nbCol = 8;
    nbRow = 5;
    widthBrick = 75;
    heightBrick = 20;
    end = false;
    speedX = 5;
    speedY = -5;
    result = 0;

    /**
     * @constructor
     * @param {HTMLCanvasElement} canvas 
     * @param {object} ctx 
     * @param {number} canvasWidth 
     * @param {number} canvasHeight 
     * @param {Array} bricks 
     * @param {HTMLHeadingElement} score 
     * @param {HTMLSpanElement} broken 
     * @param {number} x 
     * @param {number} y 
     * @param {number} barX 
     */
    constructor(canvas, ctx, canvasWidth, canvasHeight, bricks, score, broken, x, y, barX){
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.bricks = bricks;
        this.score = score;
        this.broken = broken;
        this.x = x === undefined ? this.canvasWidth / 2 : x;
        this.y = y === undefined ? this.canvasHeight - 30 : y; 
        this.barX = barX === undefined ? (this.canvasWidth - this.barWidth) / 2 : barX;
    }

    get end(){
        return this.end;
    }

    /**
     * Draw the ball on the canvas
     * @method drawBall
     */
    drawBall = () => {

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radiusBall, 0, Math.PI * 2);
        this.ctx.fillStyle = "#333";
        this.ctx.fill();
        this.ctx.closePath();
    
    }

    /**
     * Draw the paddle bar on the canvas
     * @method drawBar
     */
    drawBar = () => {

        this.ctx.beginPath();
        this.ctx.rect(this.barX, this.canvasHeight - this.barHeight - 2, this.barWidth, this.barHeight);
        this.ctx.fillStyle = "#333";
        this.ctx.fill();
        this.ctx.closePath();
    }

    /**
     * Draw all bricks on the canvas
     * @method drawBricks
     */
    drawBricks = () => {

        for(let i = 0; i < this.nbRow; i++){
            for(let j = 0; j < this.nbCol; j++){
    
                if(this.bricks[i][j].status === 1){
                    let brickX = (j * (this.widthBrick + 10) + 35 );
                    let brickY = (i * (this.heightBrick + 10) + 30 );
                    this.bricks[i][j].x = brickX;
                    this.bricks[i][j].y = brickY;
                    this.ctx.beginPath();
                    this.ctx.rect(brickX, brickY, this.widthBrick, this.heightBrick);
                    this.ctx.fillStyle = "#333";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }

    /**
     * Manage the case when user's breaking a brick
     * @method brokenBrick
     */
    brokenBrick = () => {

        for(let i = 0; i < this.nbRow; i++){
            for(let j = 0; j < this.nbCol; j++){
    
                let currentBrick = this.bricks[i][j];
    
                if(currentBrick.status === 1){
    
                    if(this.x > currentBrick.x &&
                       this.x < currentBrick.x + this.widthBrick &&
                       this.y > currentBrick.y &&
                       this.y < currentBrick.y + this.heightBrick){
    
                        this.speedY = -this.speedY;
                        currentBrick.status = 0;
                        this.result ++;
                        this.broken.textContent = this.result;
    
                        if(this.result === this.nbRow * this.nbCol){
                            const victory = "<span id='victory'><br>Bravo ! <br>Clique sur le casse-brique pour rejouer</span>"
                            this.score.innerHTML += victory; 
                            this.end = true;
                        }
                    }
                }
            }
        }
    }

    /**
     * Draw all elements on the canvas and manage all cases of game  
     * @method draw
     */
    draw = () => {
     
        if(!this.end){
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.drawBall();
            this.drawBar();
            this.drawBricks();
            this.brokenBrick();
    
            if(this.x + this.speedX > this.canvasWidth - this.radiusBall || 
               this.x + this.speedX < this.radiusBall) this.speedX = -this.speedX;
     
            if(this.y + this.speedY < this.radiusBall) this.speedY = -this.speedY;
    
            if(this.y + this.speedY > this.canvasHeight - this.radiusBall){
                if(this.x > this.barX && this.x < this.barX + this.barWidth){
                    this.speedX = this.speedX + 0.1;
                    this.speedY = this.speedY + 0.1;
                    this.speedY = -this.speedY;
                } else {
                    this.end = true;
                    const gameOver = "<span id='fail'><br>Perdu ! <br>Clique sur le casse-brique pour rejouer</span>"
                    this.score.innerHTML += gameOver; 
                }
            }
                
            this.x += this.speedX;
            this.y += this.speedY;
    
            requestAnimationFrame(this.draw);
        }
    }

    /**
     * Manage paddle bar movement with mouse's movement
     * @method moveMouse
     * @param {Event} e [mouse's movement event] 
     */
    moveMouse = e => {
        let posXBarCanvas = e.clientX - this.canvas.offsetLeft;
        
        if(posXBarCanvas > 35 && posXBarCanvas < this.canvasWidth - 35){
            this.barX = posXBarCanvas - this.barWidth / 2;
        }
    }

    /**
     * Reset and reload game on the DOM
     * @method resetGame
     */
    resetGame = () => {
        if(this.end){
            this.end = false;
            document.location.reload();
        }
    }

}