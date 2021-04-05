import controller from "./controller";
import Vector from "./Vector";

const ship = {
    size: 20,
    speed: null,
    heading: 0,
    location: null,
    acceleration: null,
    canvas: null,
    ctx: null,

    init(canvasElt, ctx) {
        controller.init();
        this.canvas = canvasElt;
        this.ctx = ctx;
        this.location = new Vector(this.canvas.width / 2, this.canvas.height / 2);
        this.speed = new Vector(0, 0);
        this.acceleration = new Vector(0.05, 0.05);
    },

    update() {
        controller.activeKeys.forEach((activeKey) => {
            this.speed.add(this.acceleration);
        })
        this.location.add(this.speed);

        if (this.location.y > this.canvas.height + this.size) {
            this.location.y = -this.size;
        } else if (this.location.y < -this.size) {
            this.location.y = this.canvas.height + this.size;
        }
        this.draw();
    },

    draw() {
        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2, this.location.y);
        this.ctx.rotate(this.heading);
        this.ctx.beginPath();
        this.ctx.moveTo(0, -1.5 * this.size / 2);
        this.ctx.lineTo(this.size / 2, 0.5 + (this.size * 1.5 / 2));
        this.ctx.lineTo(-this.size / 2, 0.5 + (this.size * 1.5 / 2));
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.restore();
    }
}
export default ship;