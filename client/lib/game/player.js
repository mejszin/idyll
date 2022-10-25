class Player {
    constructor(user_id, token = null) {
        this.user_id = user_id;
        this.token = token;
        this.position = createVector(0.5, 0.5);
        this.to = this.position.copy();
        this.from = this.position.copy();
        this.direction = createVector(0, 0);
        this.lerp_step = 0;
        this.goto_lock = false;
        this.images = {}
        getTile(player_token, 'monster_eye_right', (tile) => { this.images.right = tile });
        getTile(player_token, 'monster_eye_down', (tile) => { this.images.down = tile });
        getTile(player_token, 'monster_eye_up', (tile) => { this.images.up = tile });
        getTile(player_token, 'monster_eye_left', (tile) => { this.images.left = tile });
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

    interact(x, y, duration = null) {
        let dist = this.position.dist(createVector(x, y));
        if (dist < 3) {
            // area.debug(x, y);
            let mask_tile = area.get(area.maps.mask, x, y);
            // Destructable interaction
            if (mask_tile.destructable() != false) {
                if (duration != null) {
                    let percentage = duration / mask_tile.destructable().durability;
                    if (percentage >= 1) {
                        console.log('Mined!', 'Loot:', mask_tile.destructable().loot.join(', '));
                        let becomes = mask_tile.destructable().becomes;
                        let connected = mask_tile.destructable().connected;
                        area.destruct(area.maps.mask, x, y, becomes, connected);
                    };
                    return constrain(percentage, 0, 1);
                } else {
                    console.log('Started mining...');
                    return 0;
                }
            }
        }
        return -1;
    }

    draw() {
        this.checkImage();
        let x = this.position.x * TILESIZE;
        let y = this.position.y * TILESIZE;
        image(this.image, x - (TILESIZE / 2), y - (TILESIZE / 2), TILESIZE, TILESIZE);
    }

    sync() {
        getPosition(this.token, this.user_id, (response) => {
            let x = parseInt(response[1]);
            let y = parseInt(response[2]);
            this.position = createVector(x, y);
        });
    }

    update() {
        if (this.moving()) {
            this.lerp_step += 1;
            let lerp_factor = 0.5;
            let step = lerp_factor * this.lerp_step > 1 ? 1 : lerp_factor * this.lerp_step;
            this.position = p5.Vector.lerp(this.from, this.to, step);
        }
    }

    goto(link_id) {
        if (this.goto_lock) { return } else { this.goto_lock = true };
        let area_id = area.links[link_id];
        if (area_id != undefined) {
            getArea(player_token, area_id, (api_area) => {
                area = new Area(api_area);
                let offset = 0.5;
                if (link_id == 'N') { this.reposition(this.position.x    , AREA_HEIGHT - offset) }
                if (link_id == 'E') { this.reposition(offset             , this.position.y     ) }
                if (link_id == 'S') { this.reposition(this.position.x    , offset              ) }
                if (link_id == 'W') { this.reposition(AREA_WIDTH - offset, this.position.y     ) }
                this.goto_lock = false;
            });
            return true;
        } else {
            this.goto_lock = false;
            return false;
        }
    }

    reposition(x, y) {
        this.position = createVector(x, y);
        this.to = createVector(x, y);
    }

    move(x, y) {
        if (!area.edge(x, y)) {
            if (!area.collides(x, y)) {
                this.lerp_step = 0;
                this.from = this.position.copy();
                this.to = createVector(x, y);
                this.direction = this.to.copy().sub(this.from).normalize();
                let now = new Date();
                let seconds = (now.getTime() - last_post_time.getTime()) / 1000;
                if (seconds > (1.0 / FRAME_RATE)) {
                    last_post_time = now;
                }
            }
        } else {
            if (area.at_top(y)   ) { this.goto('N') }
            if (area.at_right(x) ) { this.goto('E') }
            if (area.at_bottom(y)) { this.goto('S') }
            if (area.at_left(x)  ) { this.goto('W') }
        }
    }
}