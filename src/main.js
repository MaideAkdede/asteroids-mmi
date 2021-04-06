import ship from "./ship";
import Asteroid from "./Asteroid";
import collisionDetector from "./collisionDetector";
import garbageManager from "./garbageManager";

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

        for (let i = 0; i < this.asteroidsCount; i++) {
            this.asteroids.push(new Asteroid(this.canvasElt, this.ctx));
        }

        ship.init(this.canvasElt, this.ctx);
        this.animate();

    },

    animate() {
        this.requestId = window.requestAnimationFrame(() => {
            this.animate();
        });
        this.ctx.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height);
        ship.update();
        ship.bullets.forEach((bullet) => {
            bullet.update();
        })
        this.asteroids.forEach((asteroid) => {
            asteroid.update();
        })
        if (ship.bullets.length && this.asteroids.length) {
            const collidingPair = collisionDetector.detectBulletAsteroidCollision(this.ctx, ship, this.asteroids);
            if (collidingPair) {
                garbageManager.remove(collidingPair.bullet, ship.bullets);
                if (collidingPair.asteroid.size > 4) {
                    this.generateSmallAsteroids(collidingPair.asteroid);
                }
                garbageManager.remove(collidingPair.asteroid, this.asteroids);
            }
        }
        if (ship && this.asteroids.length) {
            if (collisionDetector.detectShipAsteroidCollision(this.ctx, ship, this.asteroids)) {
                window.cancelAnimationFrame(this.requestId);
            }
        }
    },
    generateSmallAsteroids(parentAsteroid) {
        const childrenCount = Math.floor(2 + Math.random() * 3);
        for (let i = 0; i < childrenCount; i++) {
            this.asteroids.push(new Asteroid(this.canvasElt, this.ctx, parentAsteroid))
        }
    }
}
main.init();