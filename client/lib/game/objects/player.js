class Player extends Character {
    constructor(user_id, token = null) {
        super(user_id);
        this.user_id = user_id;
        this.token = token;
        this.goto_lock = false;
        getTile(this.token, 'monster_eye_right', (tile) => { this.images.right = tile });
        getTile(this.token, 'monster_eye_down', (tile) => { this.images.down = tile });
        getTile(this.token, 'monster_eye_up', (tile) => { this.images.up = tile });
        getTile(this.token, 'monster_eye_left', (tile) => { this.images.left = tile });
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
                        terminal_log('Mined!', 'Loot:', calculate_loot(mask_tile.destructable().loot));
                        let becomes = mask_tile.destructable().becomes;
                        let connected = mask_tile.destructable().connected;
                        area.destruct(area.maps.mask, x, y, becomes, connected);
                    };
                    return constrain(percentage, 0, 1);
                } else {
                    terminal_log('Started mining...');
                    return 0;
                }
            }
        }
        return -1;
    }

    sync() {
        getPosition(this.token, this.user_id, (response) => {
            let x = parseInt(response[1]);
            let y = parseInt(response[2]);
            this.position = createVector(x, y);
        });
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
                ghosts = getGhosts();
            });
            return true;
        } else {
            this.goto_lock = false;
            return false;
        }
    }

    move(x, y) {
        if (!area.edge(x, y)) {
            if (!area.collides(x, y)) {
                this.lerp_step = 0;
                this.from = this.position.copy();
                this.to = createVector(x, y);
                setPosition(player_token, area.id, x, y);
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