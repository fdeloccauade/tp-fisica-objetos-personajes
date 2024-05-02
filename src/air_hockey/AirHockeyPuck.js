import {Ball} from "/src/shared/Ball";

export class PuckBall extends Ball{
    constructor(x, y, velX, velY, diameter, p) {
        super(x, y, size, color,p);
    }

    display() {
        super.display();
        rect(this.position.x - this.diameter / 2, this.position.y - this.diameter / 2, this.diameter, this.diameter);
    }
}
