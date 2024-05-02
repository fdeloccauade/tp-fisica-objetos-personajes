import { Puck } from './AirHockeyPuck.js';
import { IceHockeyPlayer } from './AirHockeyPlayer.js';
import { Goal } from '../shared/Goal.js';
import {checkGoals, displayScore} from "../shared/GameManager.js";
import {handlePlayers,handleBall} from "./AirHockeyInputManager.js";

export  function  AirHockeyGame(p){
    this.scores = { score1: 0, score2: 0 };

    this.update = function (){
        p.background(255);
        this.leftGoal.display(p);
        this.rightGoal.display(p);

        handlePlayers(this.player1, this.player2, p);
        handleBall(this.ball, this.player1, this.player2,p.goalTop,p.goalBottom, p);

        checkGoals(this.ball,this.leftGoal,this.rightGoal, this.scores, p);
        displayScore(this.scores.score1,this.scores.score2,p);
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
    }

}