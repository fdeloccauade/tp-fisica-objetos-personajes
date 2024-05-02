export class Ball {
    constructor(x, y, velX, velY, diameter, p) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector(velX, velY);
        this.diameter = diameter;
        this.p = p;  // Guardamos la referencia a la instancia de p5
    }

    display() {
        this.p.fill(255);  // Usando `p` para funciones de p5
    }
}