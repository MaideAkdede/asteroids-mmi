import ship from "./ship";

const main = document.getElementById('asteroids');
document.body.removeChild(main);


const canvas = document.createElement('canvas');
document.body.insertAdjacentElement("afterbegin", canvas);
canvas.width = 640;
canvas.height = 480;

const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#fff';

ship.init(canvas, ctx);

const shipSize = 20;
const shipSpeedX = 1;
const asteroidSize = 20;

let shipLocationX = canvas.width/2;

function asteroidDraw(){
    ctx.save();
    ctx.rotate(0.1);
    ctx.translate(50, 50);
    ctx.strokeRect(-asteroidSize / 2, -asteroidSize / 2, asteroidSize, asteroidSize);
    ctx.restore();
}
animate();

function animate(){
    window.requestAnimationFrame(animate);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ship.update();
}