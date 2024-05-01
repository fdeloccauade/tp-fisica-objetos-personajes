import { FootballGame } from '../football/FootballGame.js';

const footballGame = new FootballGame();

function setup() {
    createCanvas(800, 400);
}

function draw() {
    background(255);
    footballGame.update();
    footballGame.display();
}
