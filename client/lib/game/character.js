class Character {
    constructor(user_id = null) {
        this.user_id = user_id;
        this.position = createVector(0.5, 0.5);
        this.to = this.position.copy();
        this.from = this.position.copy();
        this.direction = createVector(0, 0);
        this.lerp_step = 0;
        this.images = {}
    }
    
    x() {
        return Math.floor(this.position.x);
    }

    y() {
        return Math.floor(this.position.y);
    }

    moving() {
        return (!this.position.equals(this.to));
    }

    draw() {
        this.checkImage();
        image(
            this.image,
            TILESIZE * (this.position.x - 0.5),
            TILESIZE * (this.position.y - 0.5),
            TILESIZE,
            TILESIZE
        );
    }

    update() {
        if (this.moving()) {
            this.lerp_step += 1;
            let lerp_factor = 0.5;
            let step = lerp_factor * this.lerp_step > 1 ? 1 : lerp_factor * this.lerp_step;
            this.position = p5.Vector.lerp(this.from, this.to, step);
        }
    }

    reposition(x, y) {
        this.position = createVector(x, y);
        this.to = createVector(x, y);
    }
    
    checkImage() {
        switch (this.direction.heading()) {
            case    0: var img = this.images.right; break; // -135  -90  -45
            case   45: var img = this.images.right; break; //  180         0
            case   90: var img = this.images.down ; break; //  135   90   45
            case  135: var img = this.images.left ; break;
            case -135: var img = this.images.left ; break;
            case  -90: var img = this.images.up   ; break;
            case  -45: var img = this.images.right; break;
            case  180: var img = this.images.left ; break;
            default  : var img = this.images.down ;
        }
        this.image = tile_images[img.tileset.name][img.tileset.indices[0]];
    }
}