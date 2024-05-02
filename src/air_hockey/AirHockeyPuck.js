import {Ball} from "/src/shared/Ball.js";

export class Puck extends Ball{
    constructor(x, y, velX, velY, diameter, p) {
        super(x, y, velX, velY, diameter,p);
    }

    display() {
        super.display();
        this.p.rect(this.position.x - this.diameter / 2, this.position.y - this.diameter / 2, this.diameter, this.diameter);
    }
}
