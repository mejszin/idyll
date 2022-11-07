class Area {
    constructor(api_data) {
        this.api_data = api_data;
        this.id = api_data.id;
        this.name = api_data.name;
        this.metadata = api_data.metadata
        this.links = api_data.links;
        this.maps = {
            ground: { id: 'ground', tiles: this.parseMap(api_data.maps.ground) },
            mask:   { id: 'mask',   tiles: this.parseMap(api_data.maps.mask) },
            fringe: { id: 'fringe', tiles: this.parseMap(api_data.maps.fringe) },
        };
        locale.set(this.metadata.locale);
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
        return map.tiles[cartesian_to_index(i, j)];
    }

    destruct(map, i, j, becomes = null, connected = null) {
        map.tiles[cartesian_to_index(i, j)].destruct(becomes);
        this.syncDestruct(map, i, j, becomes);
        if (connected != null) {
            if (connected.mask != null) {
                connected.mask.forEach(relative => {
                    let index = cartesian_to_index(i + relative[0], j + relative[1]);
                    if (index > -1 && index < AREA_WIDTH * AREA_HEIGHT) {
                        area.maps.mask.tiles[index].destruct();
                        this.syncDestruct(area.maps.mask, i + relative[0], j + relative[1]);
                    };
                })
            }
            if (connected.fringe != null) {
                connected.fringe.forEach(relative => {
                    let index = cartesian_to_index(i + relative[0], j + relative[1]);
                    if (index > -1 && index < AREA_WIDTH * AREA_HEIGHT) {
                        area.maps.fringe.tiles[index].destruct();
                        this.syncDestruct(area.maps.fringe, i + relative[0], j + relative[1]);
                    };
                })
            }
        }
    }

    syncDestruct(map, i, j, becomes = null) {
        let index = [i, j].join(',');
        if (becomes == null) {
            delete this.api_data.maps[map.id].tiles[index];
        } else {
            this.api_data.maps[map.id].tiles[index] = becomes;
        }
        setArea(player.token, this.api_data);
    }

    at_top(j) {
        return (j < 0.25);
    }

    at_left(i) {
        return (i < 0.25);
    }

    at_bottom(j) {
        return (j > AREA_HEIGHT - 0.25);
    }

    at_right(i) {
        return (i > AREA_WIDTH - 0.25);
    }

    edge(i, j) {
        return (this.at_top(j) || this.at_left(i) || this.at_bottom(j) || this.at_right(i));
    }

    collides(i, j) {
        let index = (Math.floor(j) * AREA_WIDTH) + Math.floor(i);
        let ground = this.maps.ground.tiles[index] == undefined ? false : this.maps.ground.tiles[index].collidable();
        let mask   = this.maps.mask  .tiles[index] == undefined ? false : this.maps.mask  .tiles[index].collidable();
        let fringe = this.maps.fringe.tiles[index] == undefined ? false : this.maps.fringe.tiles[index].collidable();
        return (ground || mask || fringe);
    }

    parseMap(api_map) {
        var map = blankMap();
        Object.keys(api_map.tiles).forEach(coords => {
            let [i, j] = coords.split(',').map(Number);
            let index = cartesian_to_index(i, j);
            map[index] = new Tile(api_map.tiles[coords], createVector(i, j));
        });
        return map;
    }

    draw(map) {
        for (let i = 0; i < map.tiles.length; i += 1) {
            map.tiles[i].draw();
        }
    }
}