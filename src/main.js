import ship from "./ship";
import Asteroid from "./Asteroid";

const main = {
    mainElt: null,
    canvasElt: null,
    canvasEltDimensions: {
        width: 640,
        height: 480
    },
    ctx: null,
    asteroids: [],
    asteroidsCount: 4,

    init() {
        this.mainElt = document.getElementById('asteroids');
        document.body.removeChild(this.mainElt);

        this.canvasElt = document.createElement('canvas');
        document.body.insertAdjacentElement('afterbegin', this.canvasElt);
        this.canvasElt.width = this.canvasEltDimensions.width;
        this.canvasElt.height = this.canvasEltDimensions.height;

        this.ctx = this.canvasElt.getContext('2d');
        this.ctx.strokeStyle = '#fff';
        this.ctx.fillStyle = '#fff';

        for(let i=0; i<4; i++){
            this.asteroids.push(new Asteroid(this.canvasElt, this.ctx));
        }

        ship.init(this.canvasElt, this.ctx);
        this.animate();

    },

    animate() {
        window.requestAnimationFrame(() => {
            this.animate();
        });
        this.ctx.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height);
        ship.update();
        ship.bullets.forEach((bullet)=>{
            bullet.update();
        })
        this.asteroids.forEach((asteroid)=>{
            asteroid.update();
        })
    }
}
main.init();