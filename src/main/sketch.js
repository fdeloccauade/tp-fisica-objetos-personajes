//import { FootballGame } from '../football/FootballGame.js';
import { AirHockeyGame } from '../air_hockey/AirHockeyGame.js';

new p5(p => {
    //let footballGame = new FootballGame(p);
    let airHockeyGame = new AirHockeyGame(p);

    p.setup = function() {
        p.createCanvas(800, 400);
        //footballGame.resetGame();
        airHockeyGame.resetGame();

        // Configuración inicial de las posiciones del círculo y el punto
        p.circleX = p.width / 2;
        p.circleY = p.height / 2;
        p.dotSize = 10;
        p.circleSize = 50;
    };

    p.draw = function() {
        p.background(255);
        /*if (footballGame.menuActive) {
            p.fill(220);
            p.ellipse(p.mouseX, p.mouseY, p.dotSize, p.dotSize);
            p.ellipse(p.circleX, p.circleY, p.circleSize, p.circleSize);

            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(32);
            p.fill(255);
            p.text("FOOTBALL", p.circleX, p.circleY);
            p.fill(0);

            let distanceToCircle = p.dist(p.mouseX, p.mouseY, p.circleX, p.circleY);
            if (distanceToCircle < p.dotSize / 2 + p.circleSize / 2) {
                footballGame.menuActive = false;
                footballGame.resetGame();
            }
        } else {
            footballGame.update();
        }*/

        if (airHockeyGame.menuActive) {
            p.fill(220);
            p.ellipse(p.mouseX, p.mouseY, p.dotSize, p.dotSize);
            p.ellipse(p.circleX, p.circleY, p.circleSize, p.circleSize);

            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(32);
            p.fill(255);
            p.text("FOOTBALL", p.circleX, p.circleY);
            p.fill(0);

            let distanceToCircle = p.dist(p.mouseX, p.mouseY, p.circleX, p.circleY);
            if (distanceToCircle < p.dotSize / 2 + p.circleSize / 2) {
                airHockeyGame.menuActive = false;
                airHockeyGame.resetGame();
            }
        } else {
            airHockeyGame.update();
        }



    };
});