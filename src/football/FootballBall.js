export class FootballBall {
    constructor(x, y, speedX, speedY, diameter) {
        this.position = createVector(x, y);
        this.velocity = createVector(speedX, speedY);
        this.diameter = diameter;
    }

    display() {
        fill(0);
        ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
    }
}