export class Wall {
    constructor(x, y, width, height, color, p) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.p = p;
    }

    display() {
        this.p.fill(this.color);
        this.p.rect(this.x, this.y, this.width, this.height);
    }
}