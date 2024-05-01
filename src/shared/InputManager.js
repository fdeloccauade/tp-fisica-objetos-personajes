export function handlePlayers(player1, player2, time) {
    let moveSpeed = 5 * time;

    if (keyIsDown(65)) { // 'A' key
        player1.x = max(player1.x - moveSpeed, player1.size / 2);
    }
    if (keyIsDown(68)) { // 'D' key
        player1.x = min(player1.x + moveSpeed, width - player1.size / 2);
    }
    if (keyIsDown(LEFT_ARROW)) {
        player2.x = max(player2.x - moveSpeed, player2.size / 2);
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player2.x = min(player2.x + moveSpeed, width - player2.size / 2);
    }

    if (keyIsDown(87) && player1.y + player1.size / 2 >= height) { // 'W' key
        player1.jump();
    }
    if (keyIsDown(UP_ARROW) && player2.y + player2.size / 2 >= height) {
        player2.jump();
    }

    player1.update();
    player2.update();
}

export function handleBall(ball, player1, player2, time) {
    ball.position.add(p5.Vector.mult(ball.velocity, time));

    let gravity = createVector(0, 0.2 * time);
    ball.velocity.add(gravity);

    let maxSpeed = 10;
    ball.velocity.limit(maxSpeed);

    if (ball.position.y + ball.diameter / 2 >= height) {
        ball.position.y = height - ball.diameter / 2;
        ball.velocity.y *= -0.8;
    }

    if (ball.position.y - ball.diameter / 2 <= 0) {
        ball.position.y = ball.diameter / 2;
        ball.velocity.y *= -1;
    }

    if (ball.position.x - ball.diameter / 2 <= 0 || ball.position.x + ball.diameter / 2 >= width) {
        ball.velocity.x *= -1;
    }

    if (dist(ball.position.x, ball.position.y, player1.x, player1.y) < ball.diameter / 2 + player1.size / 2) {
        let diff = p5.Vector.sub(ball.position, createVector(player1.x, player1.y));
        diff.normalize();
        diff.mult(10);
        ball.velocity = diff;
        ball.velocity.mult(accelerationFactor);
        ball.position.x = player1.x + player1.size / 2 + ball.diameter / 2;
    }

    if (dist(ball.position.x, ball.position.y, player2.x, player2.y) < ball.diameter / 2 + player2.size / 2) {
        let diff = p5.Vector.sub(ball.position, createVector(player2.x, player2.y));
        diff.normalize();
        diff.mult(10);
        ball.velocity = diff;
        ball.velocity.mult(accelerationFactor);
        ball.position.x = player2.x - player2.size / 2 - ball.diameter / 2;
    }
}
