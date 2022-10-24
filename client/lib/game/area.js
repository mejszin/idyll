class Area {
    constructor(api_data) {
        this.id = api_data.id;
        this.name = api_data.name;
        this.links = api_data.links;
        this.maps = {
            ground: this.parseMap(api_data.maps.ground),
            mask: this.parseMap(api_data.maps.mask),
            fringe: this.parseMap(api_data.maps.fringe)
        };
    }

    debug(i, j) {
        let mask_tile = area.get(area.maps.mask, i, j);
        let ground_tile = area.get(area.maps.ground, i, j);
        let fringe_tile = area.get(area.maps.fringe, i, j);
        console.table({
            ground: ground_tile.name(),
            mask: mask_tile.name(),
            fringe: fringe_tile.name(),
            collidable: (ground_tile.collidable() || mask_tile.collidable() || fringe_tile.collidable()),
            destructable: (mask_tile.destructable() != false)
        })
    }

    get(map, i, j) {
        let index = j * AREA_WIDTH + i;
        return map[index];
    }

    destruct(map, i, j, becomes = null) {
        let index = j * AREA_WIDTH + i;
        map[index].destruct(becomes);
    }

    at_top(j) {
        return (j < 0);
    }

    at_left(i) {
        return (i < 0);
    }

    at_bottom(j) {
        return (j > AREA_HEIGHT - 1);
    }

    at_right(i) {
        return (i > AREA_WIDTH - 1);
    }

    edge(i, j) {
        return (this.at_top(j) || this.at_left(i) || this.at_bottom(j) || this.at_right(i));
    }

    collides(i, j) {
        let index = (Math.floor(j) * AREA_WIDTH) + Math.floor(i);
        let ground = this.maps.ground[index].collidable();
        let mask = this.maps.mask[index].collidable();
        let fringe = this.maps.fringe[index].collidable();
        return (ground || mask || fringe);
    }

    parseMap(api_map) {
        var map = []
        for (let j = 0; j < api_map.length; j += 1) {
            for (let i = 0; i < api_map[0].length; i += 1) {
                let id = api_map[j][i].id;;
                map.push(new Tile(id, createVector(i, j)));
                if ((id !== null) && !(id in tiles)) {
                    tiles[id] = {};
                    getTile(player_token, id, (response) => {
                        if (response != -1) {
                            tiles[id] = response;
                        } else {
                            getTile(player_token, 'test', (response) => {
                                tiles[id] = response;
                            })
                        }
                    })
                }
            }
        }
        return map;
    }

    draw(map) {
        for (let i = 0; i < map.length; i += 1) {
            map[i].draw();
        }
    }
}