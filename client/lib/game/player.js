class Player {
    constructor(user_id, token = null) {
        this.user_id = user_id;
        this.token = token;
        this.area = null;
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
        // -135  -90  -45
        //  180         0
        //  135   90   45
        var temp;
        if (this.direction.heading() ==    0) { temp = this.images.right }
        if (this.direction.heading() ==   45) { temp = this.images.right }
        if (this.direction.heading() ==   90) { temp = this.images.down }
        if (this.direction.heading() ==  135) { temp = this.images.left }
        if (this.direction.heading() == -135) { temp = this.images.left }
        if (this.direction.heading() ==  -90) { temp = this.images.up }
        if (this.direction.heading() ==  -45) { temp = this.images.right }
        if (this.direction.heading() ==  180) { temp = this.images.left }
        this.image = tile_images[temp.tileset.name][temp.tileset.indices[0]];
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
                if (link_id == 'N') { this.reposition(this.position.x, AREA_HEIGHT - 1) }
                if (link_id == 'E') { this.reposition(AREA_WIDTH - 1 , this.position.y) }
                if (link_id == 'S') { this.reposition(this.position.x, 0              ) }
                if (link_id == 'W') { this.reposition(0              , this.position.y) }
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