const collisionDetector = {
    detectBulletAsteroidCollision(ctx, ship, asteroids) {
        for (let i = 0; i < ship.bullets.length; i++) {
            for (let j = 0; j < asteroids.length; j++) {
                if (ctx.isPointInPath(asteroids[j].path,
                    ship.bullets[i].location.x - asteroids[j].location.x,
                    ship.bullets[i].location.y - asteroids[j].location.y)) {
                    return {
                        bullet: ship.bullets[i],
                        asteroid: asteroids[j]
                    }
                }
            }
        }
    },
    detectShipAsteroidCollision(ctx, ship, asteroids) {
        for (let i = 0; i < asteroids.length; i++) {
            for (let j = 0; j < ship.shape.length; j += 2) {
                if (ctx.isPointInPath(asteroids[i].path,
                    ship.location.x - ship.shape[j] - asteroids[i].location.x,
                    ship.location.y - ship.shape[j + 1] - asteroids[i].location.y)) {
                    return true;
                }
            }
        }
        return false;
    }
}
export default collisionDetector;