function calculate_loot(loot_table) {
    let calculated = {}
    loot_table.forEach(loot => {
        let [id, quantities] = loot;
        calculated[id] = quantities.random();
    })
    return calculated;
}

function blank_map() {
    let map = [];
    for (let j = 0; j < AREA_HEIGHT; j++) {
        for (let i = 0; i < AREA_WIDTH; i++) {
            map.push(new Tile(null, createVector(i, j)));
        }
    }
    return map;
}

function cartesian_to_index(i, j) {
    return j * AREA_WIDTH + i;
}