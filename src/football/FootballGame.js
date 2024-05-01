import { FootballBall } from './FootballBall.js';
import { FootballGoal } from './FootballGoal.js';
import { FootballPlayer } from './FootballPlayer.js';
import { handlePlayers, handleBall } from '../shared/InputManager.js';

export function FootballGame(p) {
    this.menuActive = true;
    this.score1 = 0;
    this.score2 = 0;
    
    this.resetGame = function () {
        p.goalWidth = 10;
        p.goalHeight = 100;
        p.goalTop = p.height - p.goalHeight;
        p.goalBottom = p.height;
        
        console.log(p.height, p.height - 30 / 2);

        this.player1 = new FootballPlayer(50, p.height - 30 / 2, 30, 'blue', p);
        this.player2 = new FootballPlayer(p.width - 50, p.height - 30 / 2, 30, 'yellow', p);
        console.log(this.player2);
        console.log(this.player1);
        this.ball = new FootballBall(p.width / 2, p.height / 2, 5, 5, 20, p);
        console.log(this.ball);
        this.leftGoal = new FootballGoal(10, p.height - 50, 10, 50, p);
        this.rightGoal = new FootballGoal(p.width - 20, p.height - 50, 10, 50, p);
    };

    this.update = function () {
        p.background(255);
        this.leftGoal.display(p);
        this.rightGoal.display(p);
        handlePlayers(this.player1, this.player2, (p.deltaTime / 1000) * 60, p);
        handleBall(this.ball, this.player1, this.player2, (p.deltaTime / 1000) * 60, p);
        this.checkGoals();
        this.displayScore(p);
    };

    this.displayScore = function () {
        p.fill(0);
        p.textSize(32);
        p.text(this.score1, p.width / 4, 50); // score player 1
        p.text(this.score2, 3 * p.width / 4, 50); // score player 2
    };

    this.resetBall = function () {
        this.ball.position = p.createVector(p.width / 2, p.height / 2);
        this.ball.velocity = p.createVector(5, 5);
    };

    this.checkGoals = function () {
        if (this.leftGoal.checkCollision(this.ball)) {
            this.score2++;
            this.resetBall();
        } else if (this.rightGoal.checkCollision(this.ball)) {
            this.score1++;
            this.resetBall();
        }
    };

    return this
}







