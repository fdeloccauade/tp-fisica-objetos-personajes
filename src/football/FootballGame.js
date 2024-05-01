import { FootballBall } from './FootballBall.js';
import { FootballGoal } from './FootballGoal.js';
import { FootballPlayer } from './FootballPlayer.js';
import { handlePlayers, handleBall } from '../shared/InputManager.js';

export function FootballGame() {
    let player1, player2, ball;
    let playerSize = 30;
    let score1 = 0,
        score2 = 0;
    let goalWidth, goalHeight, goalTop, goalBottom;
    let maxBallSpeed = 10;
    let accelerationFactor = 1.05;
    let menuActive = true;
    let dotSize = 10;
    let dotX, dotY;
    let circleSize = 50;
    let circleX, circleY;
    let leftGoal, rightGoal;

    function resetGame() {
        goalWidth = 10;
        goalHeight = 100;
        goalTop = height - goalHeight;
        goalBottom = height;

        player1 = new FootballPlayer(50, height - playerSize / 2, playerSize, 'blue');
        player2 = new FootballPlayer(width - 50, height - playerSize / 2, playerSize, 'yellow');

        ball = new FootballBall(width / 2, height / 2, 5, 5, 20);

        leftGoal = new FootballGoal(10, height - 50, 10, 50);
        rightGoal = new FootballGoal(width - 20, height - 50, 10, 50);
    }

    function displayScore() {
        fill(0);
        textSize(32);
        text(score1, width / 4, 50); // score player 1
        text(score2, 3 * width / 4, 50); // score player 2
    }

    function resetBall() {
        ball.position = createVector(width / 2, height / 2);
        ball.velocity = createVector(5, 5);
    }

    this.update = function () {
        let time = (deltaTime / 1000) * 60;
        if (menuActive) {
            background(220);
            dotX = mouseX;
            dotY = mouseY;
            ellipse(dotX, dotY, dotSize, dotSize);
            ellipse(circleX, circleY, circleSize, circleSize);
            textAlign(CENTER, CENTER);
            textSize(32);
            fill(255);
            text("FOOTBALL", circleX, circleY);
            fill(0);

            let distanceToCircle = dist(dotX, dotY, circleX, circleY);
            if (distanceToCircle < dotSize / 2 + circleSize / 2) {
                menuActive = false;
                resetGame();
            }
        } else {
            background(255);
            leftGoal.display();
            rightGoal.display();
            handlePlayers(player1, player2, time);
            handleBall(ball, player1, player2, time);
            checkGoals();
            displayScore();
        }
    };

    function checkGoals() {
        if (leftGoal.checkCollision(ball)) {
            score2++;
            resetBall();
        } else if (rightGoal.checkCollision(ball)) {
            score1++;
            resetBall();
        }
    }

    return this;
}
