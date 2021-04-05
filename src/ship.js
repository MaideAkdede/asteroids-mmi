const ship = {
    size: 20,
    speedX: 1,
    locationX: 0,
    canvas: null,
    ctx: null,

    init(canvasElt, ctx) {
        this.canvas = canvasElt;
        this.ctx = ctx;
        this.locationX = this.canvas.width / 2;
    },

    update() {
        this.locationX += this.speedX;
        if (this.locationX > this.canvas.width + this.size) {
            this.locationX = -this.size;
        }
        this.draw();
    },

    draw() {
        this.ctx.save();
        this.ctx.rotate(0);
        this.ctx.translate(this.locationX, this.canvas.height / 2);
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