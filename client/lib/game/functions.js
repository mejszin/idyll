function calculate_loot(loot_table) {
    let result = {}
    loot_table.forEach(loot => {
        let [item_id, possible_quantities] = loot;
        result[item_id] = possible_quantities.random();
    })
    return result;
}

function blankMap() {
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