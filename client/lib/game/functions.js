function calculate_loot(loot_table) {
    let calculated = {}
    loot_table.forEach(loot => {
        let [id, quantities] = loot;
        calculated[id] = quantities.random();
    })
    return calculated;
}