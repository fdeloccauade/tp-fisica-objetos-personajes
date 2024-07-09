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

export function handlePuck(puck,player1,player2,goalTop,goalBottom,p) {
    puck.display();
    puck.position.add(puck.velocity);

    // Colisión con las paredes superior e inferior
    if (puck.position.y <= puck.diameter / 2 || puck.position.y >= p.height - puck.diameter / 2) {
        puck.velocity.y *= -1;
    }

    // Colisión con los jugadores, Colision Rectangulo - Rectangulo
    if (p.dist(puck.position.x, puck.position.y, player1.x, player1.y) < puck.diameter / 2 + player1.size / 2) {
        puck.velocity.x *= -1;
        puck.position.x = player1.x + player1.size / 2 + puck.diameter / 2; // Evita que la bola se quede atascada en el jugador
    }
    if (p.dist(puck.position.x, puck.position.y, player2.x, player2.y) < puck.diameter / 2 + player2.size / 2) {
        puck.velocity.x *= -1;
        puck.position.x = player2.x - player2.size / 2 - puck.diameter / 2; // Evita que la bola se quede atascada en el jugador
    }

    // Colisión con las paredes de los lados (excluyendo las metas)
    if ((puck.position.x - puck.diameter / 2 <= 0 && (puck.position.y < goalTop || puck.position.y > goalBottom)) ||
        (puck.position.x + puck.diameter / 2 >= p.width && (puck.position.y < goalTop || puck.position.y > goalBottom))) {
        puck.velocity.x *= -1;
    }
}