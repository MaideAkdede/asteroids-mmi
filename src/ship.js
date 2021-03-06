import controller from "./controller";
import Vector from "./Vector";
import Bullet from "./Bullet";

const ship = {
    size: 20,
    speed: null,
    heading: 0,
    location: null,
    acceleration: null,
    canvas: null,
    ctx: null,
    bulletTimer: -1,
    bulletTimerTreshold: 5,
    bullets: [],
    path: null,

    init(canvasElt, ctx) {
        controller.init();
        this.canvas = canvasElt;
        this.ctx = ctx;
        this.location = new Vector(this.canvas.width / 2, this.canvas.height / 2);
        this.speed = new Vector(0, 0);
        this.shape = [0,
            -1.5 * this.size / 2,
            this.size / 2,
            0.5 + (this.size * 1.5 / 2),
            -this.size / 2,
            0.5 + (this.size * 1.5 / 2)];
        this.path = new Path2D();
        this.createPath();
    },
    createPath() {
        this.path.moveTo(this.shape[0], this.shape[1]);
        this.path.lineTo(this.shape[2], this.shape[3]);
        this.path.lineTo(this.shape[4], this.shape[5]);
        this.path.closePath();
    },
    checkKeys() {
        controller.activeKeys.forEach((activeKey) => {
            if (activeKey === 'ArrowUp') {
                this.acceleration = Vector.fromAngle(this.heading);
                this.speed.add(this.acceleration);
            } else if (activeKey === 'ArrowRight' || activeKey === 'ArrowLeft') {
                this.updateHeading(controller.keys[activeKey]);
            } else if (activeKey === ' ') {
                this.bulletTimer++;
                if (!(this.bulletTimer % this.bulletTimerTreshold))
                    this.bullets.push(new Bullet());
            } else {
                this.bulletTimer = -1;
            }
        })
    },
    update() {
        this.checkKeys();
        this.speed.multiply(0.97);

        this.location.add(this.speed);
        this.checkEdges();
        this.draw();
    },
    checkEdges() {
        if (this.location.y > this.canvas.height + this.size) {
            this.location.y = -this.size;
        }
        if (this.location.y < -this.size) {
            this.location.y = this.canvas.height + this.size;
        }
        if (this.location.x > this.canvas.width + this.size) {
            this.location.x = -this.size;
        }
        if (this.location.x < -this.size) {
            this.location.x = this.canvas.width + this.size;
        }
    },
    updateHeading(angle) {
        this.heading += angle;
    },
    draw() {
        this.ctx.save();
        this.ctx.translate(this.location.x, this.location.y);
        this.ctx.rotate(this.heading);
        //this.ctx.beginPath();
        this.ctx.stroke(this.path);
        this.ctx.restore();
    }
}
export default ship;