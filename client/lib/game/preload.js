const TILESETS = [
//  [tileset name, grid size],
    ['test_tileset', 32],
    ['tiny_dungeon_world', 16],
    ['tiny_galaxy_world', 16],
    ['tiny_galaxy_space', 24],
    ['tiny_galaxy_fx', 16],
    ['tiny_dungeon_monsters', 16],
    ['tiny_galaxy_interface', 16],
];

function preload() {
    let params = getURLParams();
    player_id = params.id;
    player_token = params.token;
    console.log('Loading tilesets...');
    TILESETS.forEach((data) => {
        var tileset_name = data[0];
        var grid_size = data[1];
        loadImage(`${GAME_SRC}/assets/${tileset_name}.png`, (tileset) => {
            console.log(`Loaded tileset '${tileset_name}', (${tileset.width} × ${tileset.height}).`);
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