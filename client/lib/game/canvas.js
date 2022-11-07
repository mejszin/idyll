const TILESIZE = 32;
const FRAME_RATE = 16;
const AREA_WIDTH = 20 // 32;
const AREA_HEIGHT = 16 // 24;

var player_token;
var player_id;

var last_post_time = new Date();
var area;
var player;
var cursor_image;
var tile_images = {};
var tiles = {};
var ghosts = [];

var inventory;
var locale;

var mouse_down_tile;
var mouse_down_start;

function setup() {
	canvas = createCanvas(TILESIZE * AREA_WIDTH, TILESIZE * AREA_HEIGHT);
	canvas.parent('game');
    frameRate(FRAME_RATE);
    noSmooth();
    noStroke();
    textAlign(LEFT, TOP);
    angleMode(DEGREES);
	document.addEventListener('contextmenu', event => event.preventDefault());
    cursor_image = tile_images['tiny_galaxy_interface'][128];
    player = new Player(player_id, player_token);
    getPlayer(player_token, player_id, (api_player) => {
        inventory = new Inventory();
        locale = new Locale();
        let [area_id, x, y] = api_player.position;
        getArea(player_token, area_id, (api_area) => {
            area = new Area(api_area);
            player.reposition(parseFloat(x), parseFloat(y));
        });
    });
}

function tintScreen(c) {
    // var night_tint = color(20, 20, 40, 120);
    fill(c);
    rect(0, 0, width, height);
}

function draw() {
    background('#000000');
    try {
        area.draw(area.maps.ground);
        area.draw(area.maps.mask);
        player.draw();
        ghosts.forEach(ghost => { ghost.draw() });
        area.draw(area.maps.fringe);
        inventory.draw();
        locale.draw();
    } catch (e) {
        terminal_log(e);
    }
    player.update();
    keyboardInput();
    mouseInput();
}