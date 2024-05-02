export function displayScore(score1, score2, p) {
    p.fill(0);
    p.textSize(32);
    p.text(score1, p.width / 4, 50);
    p.text(score2, 3 * p.width / 4, 50);
}

function resetBall(ball, p) {
    ball.position = p.createVector(p.width / 2, p.height / 2);
    ball.velocity = p.createVector(5, 5);
}

export function checkGoals(ball, leftGoal, rightGoal, scores, p) {
    if (leftGoal.checkCollision(ball)) {
        scores.score2++;
        resetBall(ball,p);
    } else if (rightGoal.checkCollision(ball)) {
        scores.score1++;
        resetBall(ball,p);
    }
}