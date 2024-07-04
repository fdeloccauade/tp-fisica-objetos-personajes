import { Player } from '../shared/Player.js';

export class ShooterPlayer extends Player {
    constructor(x, y, size, color, p, id) {
        super(x, y, size, color, p);
        this.bullets = [];
        this.angle = 0;  
        this.radius = 40;  
        this.angularVelocity = 1;  // Velocidad de rotación inicial
        this.maxAngularVelocity = 5;  // Velocidad máxima de rotación
        this.isAlive = true;  
        this.id = id;  
    }

    display() {
        if (this.isAlive) {
            super.display();
            this.p.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
            this.bullets.forEach(bullet => bullet.display());
        }
    }

    shoot() {
        if (this.bullets.length < 1 && this.isAlive) {  // Solo dispara si no hay balas activas y el jugador está vivo
            const angleRadians = this.angle * (Math.PI / 180);
            const bulletX = this.x + this.radius * Math.cos(angleRadians);
            const bulletY = this.y + this.radius * Math.sin(angleRadians);
            const velocityX = Math.cos(angleRadians) * 10;
            const velocityY = Math.sin(angleRadians) * 10;

            let bullet = new Bullet(bulletX, bulletY, 10, 'red', velocityX, velocityY, this.p, this.id);
            this.bullets.push(bullet);
        }
    }

    update() {
        if (this.isAlive) {
            this.angle += this.angularVelocity;  // Incrementar el ángulo para el movimiento circular
            if (this.angle >= 360) {
                this.angle = 0;
            }
            this.bullets.forEach(bullet => bullet.update());
            this.bullets = this.bullets.filter(bullet => bullet.isActive);

            // Dibujar bala en movimiento circular
            const angleRadians = this.angle * (Math.PI / 180);
            const bulletX = this.x + this.radius * Math.cos(angleRadians);
            const bulletY = this.y + this.radius * Math.sin(angleRadians);
            this.p.fill('red');
            this.p.ellipse(bulletX, bulletY, 10, 10);

            // Aumentar gradualmente la velocidad de rotación
            if (this.angularVelocity < this.maxAngularVelocity) {
                this.angularVelocity += 0.01;  // Ajusta este valor para cambiar la velocidad de incremento
            }
        }

        this.display();
    }

    hit() {
        this.isAlive = false;  
    }
}

class Bullet {
    constructor(x, y, size, color, velocityX, velocityY, p, ownerId) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.p = p;
        this.isActive = true;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.ownerId = ownerId; 
    }

    display() {
        this.p.fill(this.color);
        this.p.ellipse(this.x, this.y, this.size);
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.x > this.p.width || this.x < 0 || this.y > this.p.height || this.y < 0) {
            this.isActive = false;
        }
        this.display();
    }

    checkCollision(player) {
        if (player.isAlive && this.ownerId !== player.id && this.p.dist(this.x, this.y, player.x, player.y) < this.size / 2 + player.size / 2) {
            this.isActive = false;
            return true;
        }
        return false;
    }
}
