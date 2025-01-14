import { Puck } from './AirHockeyPuck.js';
import { IceHockeyPlayer } from './AirHockeyPlayer.js';
import { Goal } from '../shared/Goal.js';
import { Wall } from './AirHockeyWall.js';
import {checkGoals, displayScore} from "../shared/GameManager.js";
import {handlePlayers,handlePuck} from "./AirHockeyInputManager.js";
import { dt, impulse, friction } from "../shared/Globals.js";


export  function  AirHockeyGame(p){
    this.scores = { score1: 0, score2: 0 };

    this.update = function (){
        p.background(255);
        this.leftGoal.display(p);
        this.rightGoal.display(p);

        this.impulseZoneTop.display();
        this.impulseZoneBottom.display();
        this.frictionZone.display();

        handlePlayers(this.player1, this.player2, p);
        handlePuck(this.puck, this.player1, this.player2,p.goalTop,p.goalBottom, p);

        checkGoals(this.puck,this.leftGoal,this.rightGoal, this.scores, p);
        displayScore(this.scores.score1,this.scores.score2,p);

        this.detectImpulseZoneTop(p);
        this.detectImpulseZoneBottom(p);
        this.detectFrictionZone(p);
    }

    this.resetGame = function (){
        p.goalWidth = 10;
        p.goalHeight = 100;
        p.goalTop = (p.height - p.goalHeight) / 2;
        p.goalBottom = p.goalTop + p.goalHeight;

        this.player1 = new IceHockeyPlayer(50, p.height / 2, 30, 'blue',p);
        this.player2 = new IceHockeyPlayer(p.width - 50, p.height / 2, 30, 'yellow',p);

        this.puck = new Puck(p.width / 2, p.height / 2, 5, 5, 20,p);

        this.leftGoal = new Goal(0,p.goalTop, p.goalWidth, p.goalHeight,p);
        this.rightGoal = new Goal(p.width - p.goalWidth, p.goalTop, p.goalWidth, p.goalHeight,p);

        this.impulseZoneTop = new Wall(p.width /2 , p.height /2 - 170, 8, 70, 'green', p);
        this.impulseZoneBottom = new Wall(p.width /2 , p.height /2 + 120, 8, 70, 'green', p);
        this.frictionZone = new Wall(p.width /2 , p.height/3, 8, 150, 'red', p); 
    }

    this.detectImpulseZoneTop = function(p) {
        if (this.isPuckInZone(this.puck, this.impulseZoneTop)) {
            this.applyImpulse(this.puck, p);
        }
    }

    this.detectImpulseZoneBottom = function(p) {
        if (this.isPuckInZone(this.puck, this.impulseZoneBottom)) {
            this.applyImpulse(this.puck, p);
        }
    }

    this.detectFrictionZone = function(p) {
        if (this.isPuckInZone(this.puck, this.frictionZone)) {
            this.applyFriction(this.puck, p);
        }
    }

    this.isPuckInZone = function(puck, zone) {
        return (
            puck.position.x > zone.x &&
            puck.position.x < zone.x + zone.width &&
            puck.position.y > zone.y &&
            puck.position.y < zone.y + zone.height
        );                               
    }

    this.applyImpulse = function (puck, p) {
        let impulseForce = p5.Vector.mult(puck.velocity, 1).normalize().mult(impulse * puck.mass);
        let impulseAceleration = p5.Vector.div(impulseForce, puck.mass)
        puck.velocity.add(p5.Vector.mult(impulseAceleration, dt));
    }

    this.applyFriction = function (puck, p) {
        let frictionForce = p5.Vector.mult(puck.velocity,-1).normalize().mult(friction * puck.mass);
        let frictionAceleration = p5.Vector.div(frictionForce,puck.mass)
        puck.velocity.add(p5.Vector.mult(frictionAceleration, dt));
    }

}