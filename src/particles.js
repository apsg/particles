export class Particle {
    constructor(sketch) {
        this.sketch = sketch;

        this.x = sketch.random(0, this.sketch.width);
        this.y = sketch.random(0, this.sketch.height);
        this.r = sketch.random(1, 5);
        this.xSpeed = sketch.random(-1, 1);
        this.ySpeed = sketch.random(-1, 1);

        this.lineDistance = 20;
    }

    createParticle() {
        this.sketch.noStroke();
        this.sketch.fill('rgba(200,169,169,0.8)');
        this.sketch.circle(this.x, this.y, this.r);
    }

    moveParticle() {
        if (this.x < 0 || this.x > this.sketch.width)
            this.xSpeed *= -1;
        if (this.y < 0 || this.y > this.sketch.height)
            this.ySpeed *= -1;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    joinParticles(particles) {
        particles.forEach(element => {
            let dis = this.sketch.dist(this.x, this.y, element.x, element.y);
            if (dis < this.lineDistance + element.lineDistance) {
                this.sketch.stroke('rgba(255,255,255,0.08)');
                this.sketch.line(this.x, this.y, element.x, element.y);
            }
        });
    }

    drag(px, py) {
        if (this.sketch.dist(this.x, this.y, px, py) < 2 * this.lineDistance) {
            this.x -= 0.05 * (this.x - px);
            this.y -= 0.05 * (this.y - py);
        }
    }
}

export class StaticParticle extends Particle {
    constructor(sketch, x, y) {
        super(sketch);

        this.x = x;
        this.y = y;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.r = sketch.random(2, 7);

        this.lineDistance = 40;
    }

    drag() {
        // do nothing
    }
}