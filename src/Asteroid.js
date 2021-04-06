import asteroidShapes from "./asteroidShapes";
import Vector from "./Vector";

export default class Asteroid {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ctx.fillStyle = '#9d9d9d';
        this.size = 10;
        this.heading = Math.random() * Math.PI * 2;
        this.location = new Vector(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
        const asCount = asteroidShapes.length;
        const i = Math.floor(Math.random() * asCount);
        this.shape = asteroidShapes[i];

    }

    update() {
        this.draw();
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.location.x, this.location.y);
        this.ctx.rotate(this.heading);
        this.ctx.beginPath();
        this.ctx.moveTo(this.shape[0] * this.size, this.shape[1] * this.size);
        let i = 2;
        const shapePointsCount = this.shape.length;
        while (i <= shapePointsCount - 2) {
            this.ctx.lineTo(this.shape[i] * this.size, this.shape[++i] * this.size);
            i++;
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }
}