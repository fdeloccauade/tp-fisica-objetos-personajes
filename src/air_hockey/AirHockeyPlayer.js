import {Player} from "../shared/Player";

export class IceHockeyPlayer extends Player {
    constructor(x, y, size, color,p) {
        super(x, y, size, color,p);
    }

    display() {
        super.display();
        rect(this.position.x - this.diameter / 2, this.position.y - this.diameter / 2, this.diameter, this.diameter);
    }
}