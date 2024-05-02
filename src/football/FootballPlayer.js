import {Player} from "../shared/Player.js";

export class FootballPlayer extends Player {
    constructor(x, y, size, color,p) {
        super(x, y, size, color,p);
        this.speedY = 0;
        this.hitboxRadius = size / 2;
        this.gravity = 0.5;
    }

    display(){
        super.display();
        this.p.ellipse(this.x, this.y, this.size, this.size);
    }


    jump() {
        if (this.y + this.size / 2 >= this.p.height) {
            this.speedY = -10;
        }
    }

    update() {
        this.y += this.speedY;
        this.speedY += this.gravity;

        if (this.y + this.size / 2 > this.p.height) {
            this.y = this.p.height - this.size / 2;
            this.speedY = 0;
        }

        this.display();
    }
}
