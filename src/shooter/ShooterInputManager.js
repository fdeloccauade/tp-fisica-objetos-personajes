export function handlePlayer(player, p) {
    player.display();

    if (player.id === 1) {  // Controles para el jugador 1
        if (p.keyIsDown(65)) { // 'A' key
            player.x = p.max(player.x - 5, player.size / 2);
        }
        if (p.keyIsDown(68)) { // 'D' key
            player.x = p.min(player.x + 5, p.width - player.size / 2);
        }
        if (p.keyIsDown(87)) { // 'W' key
            player.y = p.max(player.y - 5, player.size / 2);
        }
        if (p.keyIsDown(83)) { // 'S' key
            player.y = p.min(player.y + 5, p.height - player.size / 2);
        }
        if (p.keyIsPressed && p.key === ' ') {
            player.shoot();
        }
    } else {  // Controles para el jugador 2
        if (p.keyIsDown(p.LEFT_ARROW)) {
            player.x = p.max(player.x - 5, player.size / 2);
        }
        if (p.keyIsDown(p.RIGHT_ARROW)) {
            player.x = p.min(player.x + 5, p.width - player.size / 2);
        }
        if (p.keyIsDown(p.UP_ARROW)) {
            player.y = p.max(player.y - 5, player.size / 2);
        }
        if (p.keyIsDown(p.DOWN_ARROW)) {
            player.y = p.min(player.y + 5, p.height - player.size / 2);
        }
        if (p.keyIsPressed && p.key === 'Enter') {  // Cambia a 'Enter' o cualquier otra tecla para disparar
            player.shoot();
        }
    }

    player.update();
}
