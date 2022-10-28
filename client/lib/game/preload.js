// TODO: Remove hardcoded tileset names

const TILESETS = [
//  [tileset name, grid size],
    ['test_tileset', 32],
    ['tiny_dungeon_world', 16],
    ['tiny_galaxy_world', 16],
    ['tiny_galaxy_space', 24],
    ['tiny_galaxy_fx', 16],
    ['tiny_dungeon_monsters', 16],
    ['tiny_galaxy_interface', 16],
    ['tiny_16_b', 16],
    ['tiny_16_original', 16],
    ['custom_trees', 16],
    ['computer', 16],
];

const { ipcRenderer } = require('electron');

function terminal_log() {
    console.log(...arguments);
    let text = [];
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'object') {
            text.push(JSON.stringify(arguments[i]));
        } else {
            text.push(arguments[i].toString());
        }
    }
    ipcRenderer.send('renderer-log', text.join(' '));
}

Array.prototype.random = function () {
    return this[
        Math.floor(
            (Math.random() * this.length)
        )
    ];
}

function preload() {
    let params = getURLParams();
    player_id = params.id;
    player_token = params.token;
    terminal_log('Loading tilesets...');
    TILESETS.forEach((data) => {
        var tileset_name = data[0];
        var grid_size = data[1];
        loadImage(`${GAME_SRC}/assets/${tileset_name}.png`, (tileset) => {
            terminal_log(`Loaded tileset '${tileset_name}', (${tileset.width} × ${tileset.height}).`);
            tile_images[tileset_name] = [];
            for (let j = 0; j < tileset.height; j += grid_size) {
                for (let i = 0; i < tileset.width; i += grid_size) {
                    tile_images[tileset_name].push(
                        tileset.get(i, j, grid_size, grid_size)
                    );
                }
            }
        });
    });
}