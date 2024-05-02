import {Player} from "../shared/Player.js";

export class IceHockeyPlayer extends Player {
    constructor(x, y, size, color,p) {
        super(x, y, size, color,p);
    }

    display() {
        super.display();
        this.p.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}