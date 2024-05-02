export class Player {
    constructor(x, y, size, color, p) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.p = p;  // Almacenamos la instancia de p5

    }

    display() {
        this.p.fill(this.color);
    }
}