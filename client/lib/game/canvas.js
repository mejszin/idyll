const GAME_SRC = '../lib/game';

const TILESIZE = 32;
const FRAME_RATE = 20;
const AREA_WIDTH = 32;
const AREA_HEIGHT = 24;

var player_token;
var player_id;

var last_post_time = new Date();
var area;
var player;
var cursor_image;
var tile_images = {};
var tiles = {};

function keyboardInput() {
    if (!player.moving()) {
        let translation = createVector(0, 0);
        let step = 0.25;
        if (keyIsDown(unchar('W')) || keyIsDown(UP_ARROW)   ) { translation.add(createVector(0, -step)) }
        if (keyIsDown(unchar('A')) || keyIsDown(LEFT_ARROW) ) { translation.add(createVector(-step, 0)) }
        if (keyIsDown(unchar('S')) || keyIsDown(DOWN_ARROW) ) { translation.add(createVector(0, step)) }
        if (keyIsDown(unchar('D')) || keyIsDown(RIGHT_ARROW)) { translation.add(createVector(step, 0)) }
        if (translation.mag() > 0) {
            player.move(
                player.position.x + translation.x,
                player.position.y + translation.y
            );
        }
    }
}

function mouseTile(scale = 1) {
    return [
        Math.floor(mouseX / TILESIZE) * scale,
        Math.floor(mouseY / TILESIZE) * scale
    ];
}

function mouseInput() {
    image(cursor_image, ...mouseTile(TILESIZE), TILESIZE, TILESIZE);
}

function mouseClicked() {
    let mask_tile = area.get(area.maps.mask, ...mouseTile());
    console.log(mask_tile.name());
}

function setup() {
	canvas = createCanvas(TILESIZE * AREA_WIDTH, TILESIZE * AREA_HEIGHT);
	canvas.parent('game');
    frameRate(FRAME_RATE);
    noSmooth();
    angleMode(DEGREES);
	document.addEventListener('contextmenu', event => event.preventDefault());
    cursor_image = tile_images['tiny_galaxy_interface'][128];
    player = new Player(player_id, player_token);
    getPlayer(player_token, player_id, (api_player) => {
        let area_id = api_player.position[0];
        getArea(player_token, area_id, (api_area) => {
            area = new Area(api_area);
        });
    });
}

function draw() {
    background('#FFFFFF');
    try {
        area.draw(area.maps.ground);
        area.draw(area.maps.mask);
        player.draw();
        area.draw(area.maps.fringe);
    } catch (e) {
        console.log(e);
    }
    player.update();
    keyboardInput();
    mouseInput();
}