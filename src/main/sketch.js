import { FootballGame } from '../football/FootballGame.js';
import { AirHockeyGame } from '../air_hockey/AirHockeyGame.js';
import { ShooterGame } from '../shooter/ShooterGame.js';
import { updateDt } from '../shared/Globals.js';

new p5(p => {
    let footballGame = new FootballGame(p);
    let airHockeyGame = new AirHockeyGame(p);
    let shooterGame = new ShooterGame(p);
    let game = 0;
    let menuActive = true;
    
    p.setup = function() {
        p.createCanvas(800, 400);

        p.circleX = (p.width / 2) + 200;
        p.circleY = p.height / 2;
        
        p.circleAirHockeyX = (p.width / 2) - 200;
        p.circleAirHockeyY = p.height / 2;
        p.circleShooterX = (p.width / 2);
        p.circleShooterY = p.height / 2 - 150;

        p.dotSize = 10;
        p.circleSize = 50;
    };

    p.draw = function() {
        updateDt((p.deltaTime / 1000) * 60);
        p.background(255);

        if (menuActive) {
            p.fill(220);
            p.ellipse(p.circleX, p.circleY, p.circleSize, p.circleSize);
            p.ellipse(p.circleShooterX, p.circleShooterY, p.circleSize, p.circleSize);
            p.rect(p.circleAirHockeyX - p.circleSize / 2, p.circleAirHockeyY - p.circleSize / 2, p.circleSize, p.circleSize);

            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(32);
            p.fill(0);
            p.text("FOOTBALL", p.circleX, p.circleY);
            p.text("AIR HOCKEY", p.circleAirHockeyX, p.circleAirHockeyY);
            p.text("SHOOTER", p.circleShooterX, p.circleShooterY);
            
            // Check for clicks on the menu items
            let distanceToFootballCircle = p.dist(p.mouseX, p.mouseY, p.circleX, p.circleY);
            let distanceToAirHockeyCircle = p.dist(p.mouseX, p.mouseY, p.circleAirHockeyX, p.circleAirHockeyY);
            let distanceToShooterCircle = p.dist(p.mouseX, p.mouseY, p.circleShooterX, p.circleShooterY);

            if (p.mouseIsPressed) {
                if (distanceToFootballCircle < p.circleSize / 2) {
                    menuActive = false;
                    footballGame.resetGame();
                    game = 1;
                } else if (distanceToAirHockeyCircle < p.circleSize / 2) {
                    menuActive = false;
                    airHockeyGame.resetGame();
                    game = 2;
                } else if (distanceToShooterCircle < p.circleSize / 2) {
                    menuActive = false;
                    shooterGame.resetGame();
                    game = 3;
                }
            }
        } else {
            switch (game) {
                case 1: 
                    footballGame.update();
                    break;
                case 2: 
                    airHockeyGame.update();
                    break;
                case 3: 
                    shooterGame.update();
                    break;
                default:
                    menuActive = true;
                    game = 0;
                    break;
            }
        }
    };

    p.keyPressed = function() {
        if (p.key === 'm' || p.key === 'M') {
            menuActive = true;
            game = 0;
        }
    };
});
