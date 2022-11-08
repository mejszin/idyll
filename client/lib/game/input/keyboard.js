function keyboardInput() {
    if ((!player.moving()) && (!chat.visible)) {
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
    if (chat.visible) {
        if (keyCode == ENTER ) { chat.send()  ; return }
        if (keyCode == ESCAPE) { chat.cancel(); return }
        chat.append(key);
    } else {
        if (keyIsDown(unchar('E'))) { inventory.toggle() }
        if (keyIsDown(unchar('M'))) { locale.toggle() }
        if (keyIsDown(unchar('T'))) { chat.toggle() }
    }
}