import {Ball} from "../shared/Ball.js";

export class FootballBall extends Ball{
    constructor(x, y, velX, velY, diameter, p) {
        super(x, y, velX, velY,diameter,p);
    }

    display() {
        super.display();
        this.p.ellipse(this.position.x, this.position.y, this.diameter);
    }
}


