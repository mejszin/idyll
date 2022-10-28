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

    cartesian_to_index(i, j) {
        return j * AREA_WIDTH + i;
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
        return map[this.cartesian_to_index(i, j)];
    }

    destruct(map, i, j, becomes = null, connected = null) {
        map[this.cartesian_to_index(i, j)].destruct(becomes);
        if (connected != null) {
            if (connected.mask != null) {
                connected.mask.forEach(relative => {
                    let index = this.cartesian_to_index(i + relative[0], j + relative[1]);
                    if (index > -1 && index < AREA_WIDTH * AREA_HEIGHT) { area.maps.mask[index].destruct() };
                })
            }
            if (connected.fringe != null) {
                connected.fringe.forEach(relative => {
                    let index = this.cartesian_to_index(i + relative[0], j + relative[1]);
                    if (index > -1 && index < AREA_WIDTH * AREA_HEIGHT) { area.maps.fringe[index].destruct() };
                })
            }
        }
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
        let ground = this.maps.ground[index] == undefined ? false : this.maps.ground[index].collidable();
        let mask = this.maps.mask[index] == undefined ? false : this.maps.mask[index].collidable();
        let fringe = this.maps.fringe[index] == undefined ? false : this.maps.fringe[index].collidable();
        return (ground || mask || fringe);
    }

    parseMap(api_map) {
        var map = []
        for (let j = 0; j < api_map.length; j += 1) {
            for (let i = 0; i < api_map[0].length; i += 1) {
                let id = api_map[j][i].id;;
                map.push(new Tile(id, createVector(i, j)));
                if ((id !== null) && !(id in tiles)) {
                    cacheTile(id);
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