import { FootballBall } from './FootballBall.js';
import { FootballPlayer } from './FootballPlayer.js';
import { Goal } from '../shared/Goal.js';
import { displayScore } from '../shared/GameManager.js';
import { checkGoals } from '../shared/GameManager.js';
import { handlePlayers, handleBall } from './FootballInputManager.js';

export function shooterGame(p) {
    this.scores = { score1: 0, score2: 0 };

    this.update = function () {
        p.background(255);
        this.leftGoal.display(p);
        this.rightGoal.display(p);
        handlePlayers(this.player1, this.player2, (p.deltaTime / 1000) * 60, p);
        handleBall(this.ball, this.player1, this.player2, (p.deltaTime / 1000) * 60, p);
        checkGoals(this.ball, this.leftGoal, this.rightGoal,this.scores, p);
        displayScore(this.scores.score1, this.scores.score2,p);
    };

    this.resetGame = function () {
        p.goalWidth = 10;
        p.goalHeight = 100;
        p.goalTop = p.height - p.goalHeight;
        p.goalBottom = p.height;


        this.player1 = new FootballPlayer(50, p.height - 30 / 2, 30, 'blue', p);
        this.player2 = new FootballPlayer(p.width - 50, p.height - 30 / 2, 30, 'yellow', p);

        this.ball = new FootballBall(p.width / 2, p.height / 2, 5, 5, 20, p);

        this.leftGoal = new Goal(10, p.height - 50, 10, 50, p);
        this.rightGoal = new Goal(p.width - 20, p.height - 50, 10, 50, p);
    };

    return this
}







