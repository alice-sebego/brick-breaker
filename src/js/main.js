// https://developer.mozilla.org/fr/docs/Web/API/Canvas_API

const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");
$canvas.width = $canvas.getBoundingClientRect().width;
$canvas.height = $canvas.getBoundingClientRect().height;

const radiusBall = 10, barWidth = 75, barHeight = 10;

let x = $canvas.width / 2, y = $canvas.height - 30,
barX = ($canvas.width - barWidth) / 2;

const drawBall = () =>{

    ctx.beginPath();
    ctx.arc(x, y, radiusBall, 0, Math.PI * 2, true);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();

}

drawBall()

const drawBar = () =>{

    ctx.beginPath();
    ctx.rect(barX, $canvas.height - barHeight - 2, barWidth, barHeight);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}

drawBar()
