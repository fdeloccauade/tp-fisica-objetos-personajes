export function handlePlayers(player1,player2,p) {
    player1.display();
    player2.display();

    if (p.keyIsDown(87)) { // 'W' key
        player1.y = p.max(player1.y - 5, player1.size / 2);
    }
    if (p.keyIsDown(83)) {  //'S' key
        player1.y = p.min(player1.y + 5, p.height - player1.size / 2);
    }
    if (p.keyIsDown(p.UP_ARROW)) {
        player2.y = p.max(player2.y - 5, player2.size / 2);
    }
    if (p.keyIsDown(p.DOWN_ARROW)) {
        player2.y = p.min(player2.y + 5, p.height - player2.size / 2);
    }
}

export function handleBall(ball,player1,player2,goalTop,goalBottom,p) {
    ball.display();
    ball.position.add(ball.velocity);

    // Colisión con las paredes superior e inferior
    if (ball.position.y <= ball.diameter / 2 || ball.position.y >= p.height - ball.diameter / 2) {
        ball.velocity.y *= -1;
    }

    // Colisión con los jugadores
    if (p.dist(ball.position.x, ball.position.y, player1.x, player1.y) < ball.diameter / 2 + player1.size / 2) {
        ball.velocity.x *= -1;
        ball.position.x = player1.x + player1.size / 2 + ball.diameter / 2; // Evita que la bola se quede atascada en el jugador
    }
    if (p.dist(ball.position.x, ball.position.y, player2.x, player2.y) < ball.diameter / 2 + player2.size / 2) {
        ball.velocity.x *= -1;
        ball.position.x = player2.x - player2.size / 2 - ball.diameter / 2; // Evita que la bola se quede atascada en el jugador
    }

    // Colisión con las paredes de los lados (excluyendo las metas)
    if ((ball.position.x - ball.diameter / 2 <= 0 && (ball.position.y < goalTop || ball.position.y > goalBottom)) ||
        (ball.position.x + ball.diameter / 2 >= p.width && (ball.position.y < goalTop || ball.position.y > goalBottom))) {
        ball.velocity.x *= -1;
    }
}