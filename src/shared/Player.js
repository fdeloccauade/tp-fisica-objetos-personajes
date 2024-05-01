export class Player {
    constructor(x, y, size, color) {
        this.pos = {x: x, y: y};
        this.size = size;
        this.color = color;
        this.hitboxRadius = size / 2;
        this.speedY = 0;
        this.gravity = 0.5;
    }

    display() {
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    update() {
        this.pos.y += this.speedY;
        this.speedY += this.gravity;

        // Prevent the player from going below the ground
        if (this.pos.y + this.size / 2 > height) {
            this.pos.y = height - this.size / 2;
            this.speedY = 0;
        }
    }
}