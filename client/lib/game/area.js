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

    get(map, i, j) {
        let index = j * AREA_WIDTH + i;
        return map[index];
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
        let ground = this.maps.ground[index].collides();
        let mask = this.maps.mask[index].collides();
        let fringe = this.maps.fringe[index].collides();
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