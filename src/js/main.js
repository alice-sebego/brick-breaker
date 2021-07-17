import _ from "lodash";
import Game from "./game.js";

// HANDLE CANVAS
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");
$canvas.width = $canvas.getBoundingClientRect().width;
$canvas.height = $canvas.getBoundingClientRect().height;

// DISPLAY SCORE
const $score = document.querySelector("#score");
const $brickBroken = document.querySelector("#brick-broken");

// INITIALIZE BRICKS
const bricks = [];
for(let i = 0; i < 5; i++){
    bricks[i] = [];
    for(let j = 0; j < 8; j++){
        bricks[i][j] = {x: 0, y: 0, status: 1};
    }
}

// BUTTONS START AND RESET
const $start = document.querySelector("nav > button");

// INSTANCE OF GAME
$start.addEventListener("click", () => {

    const brickBreaken = new Game($canvas, ctx, $canvas.width, $canvas.height, bricks, $score, $brickBroken);
    brickBreaken.draw();
    document.addEventListener("mousemove", brickBreaken.moveMouse);
    $start.disabled = true;
    $canvas.addEventListener("click", brickBreaken.resetGame);
    
});

// INSERT CURRENT YEAR ON THE FOOTER
const $year = document.querySelector("#year");
const date = new Date(Date.now());
$year.textContent = date.getFullYear();