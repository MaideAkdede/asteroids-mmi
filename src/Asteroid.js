import asteroidShapes from "./asteroidShapes";
import Vector from "./Vector";

export default class Asteroid {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ctx.fillStyle = '#9d9d9d';
        this.size = 7 + Math.random() * 5;
        this.heading = Math.random() * Math.PI * 2;
        this.location = new Vector(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
        this.speed = new Vector(0, 0);
        this.acceleration = Vector.fromAngle(this.heading, 2 + Math.random() * 2);
        this.speed.add(this.acceleration);
        const asCount = asteroidShapes.length;
        const i = Math.floor(Math.random() * asCount);
        this.shape = asteroidShapes[i];

    }

    update() {
        this.location.add(this.speed);
        this.checkEdges();
        this.draw();
    }

    checkEdges() {
        const offset = 50;

        if (this.location.y > this.canvas.height + offset) {
            this.location.y = -offset;
        }
        if (this.location.y < -offset) {
            this.location.y = this.canvas.height + offset;
        }
        if (this.location.x > this.canvas.width + offset) {
            this.location.x = -offset;
        }
        if (this.location.x < -offset) {
            this.location.x = this.canvas.width + offset;
        }
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