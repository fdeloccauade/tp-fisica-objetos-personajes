export class FootballGoal {
    constructor(x, y, width, height, p) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.p = p;  // Almacenamos la instancia de p5
    }

    display() {
        this.p.rect(this.x, this.y, this.width, this.height);
    }

    checkCollision(ball) {
        if (ball.position.x + ball.diameter / 2 >= this.x &&
            ball.position.x - ball.diameter / 2 <= this.x + this.width &&
            ball.position.y + ball.diameter / 2 >= this.y &&
            ball.position.y - ball.diameter / 2 <= this.y + this.height) {
            return true;
        }
        return false;
    }
}