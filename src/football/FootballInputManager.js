import { dt } from '../shared/Global.js';

export function handlePlayers(player1, player2, p) {
    let moveSpeed = 5 * dt;

    if (p.keyIsDown(65)) { // 'A' key
        player1.x = p.max(player1.x - moveSpeed, player1.size / 2);
    }
    if (p.keyIsDown(68)) { // 'D' key
        player1.x = p.min(player1.x + moveSpeed, p.width - player1.size / 2);
    }
    if (p.keyIsDown(p.LEFT_ARROW)) {
        player2.x = p.max(player2.x - moveSpeed, player2.size / 2);
    }
    if (p.keyIsDown(p.RIGHT_ARROW)) {
        player2.x = p.min(player2.x + moveSpeed, p.width - player2.size / 2);
    }

    if (p.keyIsDown(87) && player1.y + player1.size / 2 >= p.height) { // 'W' key
        player1.jump();
    }
    if (p.keyIsDown(p.UP_ARROW) && player2.y + player2.size / 2 >= p.height) {
        player2.jump();
    }

    player1.update();
    player2.update();
}

export function handleBall(ball, player1, player2, p) {
    let accelerationFactor = 1.05;

    //MRU
    ball.position.add(p5.Vector.mult(ball.velocity, dt));

    //MRUV
    let gravity = p.createVector(0, 0.2 * dt);
    ball.velocity.add(gravity);

    let maxSpeed = 10;
    ball.velocity.limit(maxSpeed);

    if (ball.position.y + ball.diameter / 2 >= p.height) {
        ball.position.y = p.height - ball.diameter / 2;
        ball.velocity.y *= -0.8;
    }

    if (ball.position.y - ball.diameter / 2 <= 0) {
        ball.position.y = ball.diameter / 2;
        ball.velocity.y *= -1;
    }

    if (ball.position.x - ball.diameter / 2 <= 0 || ball.position.x + ball.diameter / 2 >= p.width) {
        ball.velocity.x *= -1;
    }
    //COLISION CON JUGADORES

    // verifica si la pelota ha colisionado con el jugador 1. Utiliza la función dist() , y luego verifica si esta distancia es menor que la suma de los radios de la pelota y el jugador.
    if (p.dist(ball.position.x, ball.position.y, player1.x, player1.y) < ball.diameter / 2 + player1.size / 2) {
        // vector (diff) que apunta desde el jugador 2 a la pelota.
        let diff = p5.Vector.sub(ball.position, p.createVector(player1.x, player1.y));

        // longitud = 1
        diff.normalize();
        // longitud =10
        diff.mult(7);

        // "efecto de parábola" basado en la posición vertical de la pelota en relación con el jugador 2
        //mapeando la diferencia entre la posición vertical de la pelota y la posición vertical del jugador
        let parabolaEffect = p.map(ball.position.y - player1.y, -player1.size / 2, player1.size / 2, -1, 1);

        // Esta línea añade el efecto de parábola a la componente vertical del vector diff
        diff.y += parabolaEffect;

        // Esta línea establece la velocidad de la pelota igual al vector diff
        ball.velocity = diff;

        //Esta línea multiplica la velocidad de la pelota por un factor de aceleración.
        ball.velocity.mult(accelerationFactor);
    }

    if (p.dist(ball.position.x, ball.position.y, player2.x, player2.y) < ball.diameter / 2 + player2.size / 2) {
        let diff = p5.Vector.sub(ball.position, p.createVector(player2.x, player2.y));
        diff.normalize();
        diff.mult(7);

        //git
        let parabolaEffect = p.map(ball.position.y - player2.y, -player2.size / 2, player2.size / 2, -1, 1);
        diff.y += parabolaEffect;

        ball.velocity = diff;
        ball.velocity.mult(accelerationFactor);
    }


    ball.display();
}
