export class FootballPlayer {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.hitboxRadius = this.size / 2;
        this.speedY = 0;
        this.gravity = 0.5;
    }

    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }

    jump() {
        if (this.y + this.size / 2 >= height) {
            this.speedY = -10;
        }
    }

    update() {
        this.y += this.speedY;
        this.speedY += this.gravity;

        if (this.y + this.size / 2 > height) {
            this.y = height - this.size / 2;
            this.speedY = 0;
        }
    }
}


/*
import { Player } from '../shared/Player.js';

export class FootballPlayer extends Player {
    constructor(x, y, size, color) {
        super(x, y, size, color);
    }

    jump() {
        if (this.y + this.size / 2 >= height) {
            this.speedY = -10;
        }
    }
}
*/

