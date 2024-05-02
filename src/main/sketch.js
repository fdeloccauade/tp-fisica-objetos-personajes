import { FootballGame } from '../football/FootballGame.js';
import { AirHockeyGame } from '../air_hockey/AirHockeyGame.js';

new p5(p => {
    let footballGame = new FootballGame(p);
    let airHockeyGame = new AirHockeyGame(p);
    let game = 0;
    let menuActive = true;
    
    p.setup = function() {
        p.createCanvas(800, 400);

        p.circleX = (p.width  / 2) + 200;
        p.circleY = p.height / 2;
        p.circleAirHockeyX = (p.width  / 2) - 200;
        p.circleAirHockeyY = p.height / 2;
        p.dotSize = 10;
        p.circleSize = 50;
    };

    p.draw = function() {
        p.background(255);

        p.fill(220);
        p.ellipse(p.mouseX, p.mouseY, p.dotSize, p.dotSize);
        p.ellipse(p.circleX, p.circleY, p.circleSize, p.circleSize);
        p.rect(p.circleAirHockeyX - p.circleSize / 2, p.circleAirHockeyY - p.circleSize / 2, p.circleSize, p.circleSize);

        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(32);
        p.fill(0);
        p.text("FOOTBALL", p.circleX, p.circleY);
        p.fill(0);

        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(32);
        p.fill(0);
        p.text("AIR HOCKEY", p.circleAirHockeyX, p.circleAirHockeyY);
        p.fill(0);
        
        switch (game){
            case 1: footballGame.update();
                break;
            case 2: airHockeyGame.update();
                break;
                default:
                    //Colisiones Punto circulo y Punto rectangulo
                    let distanceToFootballCircle = p.dist(p.mouseX, p.mouseY, p.circleX, p.circleY);
                    let distanceToAirHockeyCircle = p.dist(p.mouseX, p.mouseY, p.circleAirHockeyX, p.circleAirHockeyY);

                    if (distanceToFootballCircle < p.dotSize / 2 + p.circleSize / 2) {
                        menuActive = false;
                        footballGame.resetGame();
                        game = 1;

                    }else if(distanceToAirHockeyCircle < p.dotSize / 2 + p.circleSize / 2){
                        menuActive = false;
                        game = 2;
                        airHockeyGame.resetGame();
                    }
                break;
        }
    };
});