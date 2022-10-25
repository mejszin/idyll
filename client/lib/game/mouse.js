function mouseTile(scale = 1) {
    return [
        Math.floor(mouseX / TILESIZE) * scale,
        Math.floor(mouseY / TILESIZE) * scale
    ];
}

function mouseTileEquals(x, y) {
    return ((x == Math.floor(mouseX / TILESIZE)) && (y == Math.floor(mouseY / TILESIZE)));
}

function mouseAbort() {
    mouse_down_start = -1;
    terminal_log('Aborted interaction.');
}

function mouseInput() {
    image(cursor_image, ...mouseTile(TILESIZE), TILESIZE, TILESIZE);
    if (mouseIsPressed && (mouse_down_start > 0)) {
        if (mouseTileEquals(...mouse_down_tile)) {
            let duration_pressed = floor(millis() - mouse_down_start); // ms
            let percentage = player.interact(...mouseTile(), duration_pressed);
            if (percentage >= 0) {
                if (percentage == 1) {
                    mouse_down_start = -1;
                } else {
                    fill(100, 0, 100, 128);
                    rect(...mouseTile(TILESIZE), TILESIZE, TILESIZE * percentage);
                }
            } else {
                mouseAbort(); // Moved too far from tile
            }
        } else {
            mouseAbort(); // Moved cursor to different tile
        }
    }
}

function mouseClicked() {
    // ...
}

function mousePressed() {
    mouse_down_start = millis();
    mouse_down_tile = mouseTile();
    player.interact(...mouseTile());
}

function mouseReleased(event) {
    if (mouse_down_start > 0) {
        let duration_pressed = floor(millis() - mouse_down_start);
        mouse_down_start = -1;
        player.interact(...mouseTile(), duration_pressed);
    }
}