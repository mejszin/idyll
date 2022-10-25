class Tile {
    constructor(id, position, metadata = {}) {
        this.id = id;
        this.position = position;
        this.metadata = metadata;
        this.anim_state = 0;
        this.anim_cooldown = 0;
    }

    name() {
        return this.exists() ? tiles[this.id].name : null;
    }
    
    exists() {
        return tiles[this.id] != undefined;
    }

    checkAnimState() {
        var tile = tiles[this.id];
        this.anim_cooldown -= 1;
        if (this.anim_cooldown <= 0) {
            // if (tile.animation == undefined) { return } // Causes artifacts
            if (tile.animation.variance.length > 0) {
                this.anim_cooldown = Math.floor(
                    random(
                        tile.animation.duration * tile.animation.variance[0],
                        tile.animation.duration * tile.animation.variance[1]
                    )
                );
            } else {
              this.anim_cooldown = tile.animation.duration;
            }
            this.anim_state = (this.anim_state == 0) ? 1 : 0;
        }
    }

    collidable() {
        if (this.id == null) { return false }
        if (tiles[this.id].interaction == null) { return false }
        return tiles[this.id].interaction.collidable;
    }

    destructable() {
        if (this.id == null) { return false }
        if (tiles[this.id].interaction.destructable == null) { return false } 
        return tiles[this.id].interaction.destructable;
    }

    destruct(becomes = null) {
        terminal_log('Destructing:', this.id, 'Becomes:', becomes);
        this.id = becomes;
    }

    draw() {
        if (this.id == null) { return }
        if (tiles[this.id] == undefined || tiles[this.id].tileset == null) {
            cacheTile(this.id);
            return
        }
        let tileset = tiles[this.id].tileset.name;
        let indices = tiles[this.id].tileset.indices;
        if (indices.length == 1) {
            var tile_image = tile_images[tileset][indices[0]];
        } else {
            this.checkAnimState();
            let index = this.anim_state == 0 ? indices[0] : indices[1];
            var tile_image = tile_images[tileset][index];
        }
        image(
            tile_image,
            this.position.x * TILESIZE,
            this.position.y * TILESIZE,
            TILESIZE, TILESIZE
        );
    }
}