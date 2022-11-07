function keyboardInput() {
    // Movement
    if (!player.moving()) {
        let translation = createVector(0, 0);
        let step = 0.5;
        if (keyIsDown(unchar('W')) || keyIsDown(UP_ARROW   )) { translation.add(createVector(0, -step)) }
        if (keyIsDown(unchar('A')) || keyIsDown(LEFT_ARROW )) { translation.add(createVector(-step, 0)) }
        if (keyIsDown(unchar('S')) || keyIsDown(DOWN_ARROW )) { translation.add(createVector(0, step)) }
        if (keyIsDown(unchar('D')) || keyIsDown(RIGHT_ARROW)) { translation.add(createVector(step, 0)) }
        if (translation.mag() > 0) {
            player.move(
                player.position.x + translation.x,
                player.position.y + translation.y
            );
        }
    }
}

function keyPressed() {
    // HUD
    if (keyIsDown(unchar('E'))) { inventory.toggle() }
}