class Tile {
    constructor(id, position, metadata = {}) {
        this.id = id;
        this.position = position;
        this.metadata = metadata;
        this.anim_state = 0;
        this.anim_cooldown = 0;
    }

    name() {
        return tiles[this.id].name;
    }

    checkAnimState() {
        var tile = tiles[this.id];
        this.anim_cooldown -= 1;
        if (this.anim_cooldown <= 0) {
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

    collides() {
        if (this.id == null) { return false }
        return tiles[this.id].collide;
    }

    draw() {
        if (this.id == null) { return }
        this.checkAnimState();
        let tileset = tiles[this.id].tileset.name;
        let indices = tiles[this.id].tileset.indices;
        if (indices.length == 1) {
            var tile_image = tile_images[tileset][indices[0]];
        } else {
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