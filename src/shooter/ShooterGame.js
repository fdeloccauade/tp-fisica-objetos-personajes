import { ShooterPlayer } from './ShooterPlayer.js';
import { handlePlayer } from './ShooterInputManager.js';

export function ShooterGame(p) {
    this.player1;
    this.player2;
    this.winner = null;

    this.update = function () {
        p.background(255);
        if (!this.winner) {
            handlePlayer(this.player1, p);
            handlePlayer(this.player2, p);
            this.checkCollisions();
        } else {
            this.displayWinner();
        }
    };

    this.resetGame = function () {
        this.player1 = new ShooterPlayer(100, p.height / 2, 30, 'blue', p, 1);
        this.player2 = new ShooterPlayer(p.width - 100, p.height / 2, 30, 'green', p, 2);
        this.winner = null;
    };

    this.checkCollisions = function () {
        this.player1.bullets.forEach(bullet => {
            if (bullet.checkCollision(this.player2)) {
                this.player2.hit();
                this.winner = 'Player 1';
            }
        });

        this.player2.bullets.forEach(bullet => {
            if (bullet.checkCollision(this.player1)) {
                this.player1.hit();
                this.winner = 'Player 2';
            }
        });
    };

    this.displayWinner = function () {
        p.fill(0);
        p.textSize(32);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(this.winner + ' Wins!', p.width / 2, p.height / 2);
    };
}
