import { Puck } from './AirHockeyPuck.js';
import { IceHockeyPlayer } from './AirHockeyPlayer.js';
import { Goal } from '../shared/Goal.js';
import { Wall } from './AirHockeyWall.js';
import {checkGoals, displayScore} from "../shared/GameManager.js";
import {handlePlayers,handleBall} from "./AirHockeyInputManager.js";
import { dt, impulse, friction } from "../shared/Globals.js";


export  function  AirHockeyGame(p){
    this.scores = { score1: 0, score2: 0 };

    this.update = function (){
        p.background(255);
        this.leftGoal.display(p);
        this.rightGoal.display(p);

        this.impulseZone.display();
        this.frictionZone.display();

        handlePlayers(this.player1, this.player2, p);
        handleBall(this.ball, this.player1, this.player2,p.goalTop,p.goalBottom, p);

        checkGoals(this.ball,this.leftGoal,this.rightGoal, this.scores, p);
        displayScore(this.scores.score1,this.scores.score2,p);

        this.detectImpulseZone(p);
        this.detectFrictionZone(p);
    }

    this.resetGame = function (){
        p.goalWidth = 10;
        p.goalHeight = 100;
        p.goalTop = (p.height - p.goalHeight) / 2;
        p.goalBottom = p.goalTop + p.goalHeight;

        this.player1 = new IceHockeyPlayer(50, p.height / 2, 30, 'blue',p);
        this.player2 = new IceHockeyPlayer(p.width - 50, p.height / 2, 30, 'yellow',p);

        this.ball = new Puck(p.width / 2, p.height / 2, 5, 5, 20,p);

        this.leftGoal = new Goal(0,p.goalTop, p.goalWidth, p.goalHeight,p);
        this.rightGoal = new Goal(p.width - p.goalWidth, p.goalTop, p.goalWidth, p.goalHeight,p);

        this.impulseZone = new Wall(p.width /2 , p.height /2 - 150, 15, 80, 'green', p);
        this.frictionZone = new Wall(p.width /2 , p.height/2 + 75, 15, 80, 'red', p); 
    }

    this.detectImpulseZone = function(p) {
        if (this.isPuckInZone(this.ball, this.impulseZone)) {
            this.applyImpulse(this.ball);
        }
    }

    this.detectFrictionZone = function(p) {
        if (this.isPuckInZone(this.ball, this.frictionZone)) {
            this.applyFriction(this.ball);
        }
    }

    this.isPuckInZone = function(ball, zone) {
        return (
            ball.position.x > zone.x &&
            ball.position.x < zone.x + zone.width &&
            ball.position.y > zone.y &&
            ball.position.y < zone.y + zone.height
        );
    }

    this.applyImpulse = function (ball) {
        let impulseForce = p.createVector(impulse * dt, 0); 
        ball.velocity.add(impulseForce);
    }

    this.applyFriction = function (ball) {
        let frictionForce = ball.velocity.copy().mult(-1).normalize().mult(friction * dt);
        ball.velocity.add(frictionForce);
    }

}