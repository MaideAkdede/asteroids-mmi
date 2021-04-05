const main = document.getElementById('asteroids');
document.body.removeChild(main);

const canvas = document.createElement('canvas');
document.body.insertAdjacentElement("afterbegin", canvas);
canvas.width = 640;
canvas.height = 480;

const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#fff';

const shipSize = 20;
const asteroidSize = 20;

function shipDraw(){
    ctx.save();
    ctx.rotate(0);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(0, -1.5 * shipSize / 2);
    ctx.lineTo(shipSize / 2, 0.5 + (shipSize * 1.5 / 2));
    ctx.lineTo(-shipSize / 2, 0.5 + (shipSize * 1.5 / 2));
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

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
    shipDraw();
}