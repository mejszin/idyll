function syncGhosts() {
    ghosts.forEach(ghost => { ghost.sync() });
    if (frameCount % 20 == 0) {
        getAreaPlayers(player.token, area.id, players => {
            previous_players = area.players;
            area.players = players;
            players.forEach(user_id => {
                if ((previous_players.indexOf(user_id) == -1) && (user_id != player.user_id)) {
                    ghosts.push(new Ghost(user_id));
                }
            });
        })
    }
    removeOutOfAreaGhosts();
}

function removeOutOfAreaGhosts() {
    let out_of_area = [];
    ghosts.forEach(ghost => {
        if (ghost.area_id != area.id) {
            out_of_area.push(ghost);
        }
    });
    out_of_area.forEach(ghost => {
        terminal_log(ghost.user_id, 'has left the area...', ghost.area_id, '->', area.id);
        ghosts.splice(ghost, 1);
    });
}

function getGhosts() {
    ghosts = [];
    area.players.forEach(user_id => {
        if (user_id != player.user_id) {
            ghosts.push(new Ghost(user_id));
        }
    });
    return ghosts;
}

function drawGhosts() {
    ghosts.forEach(ghost => {
        ghost.update();
        ghost.draw();
    });
}

class Ghost extends Character {
    constructor(user_id) {
        super(user_id);
        this.user_id = user_id;
        getTile(player.token, 'monster_eye_right', (tile) => { this.images.right = tile });
        getTile(player.token, 'monster_eye_down' , (tile) => { this.images.down  = tile });
        getTile(player.token, 'monster_eye_up'   , (tile) => { this.images.up    = tile });
        getTile(player.token, 'monster_eye_left' , (tile) => { this.images.left  = tile });
        this.sync(true);
    }

    sync(first = false) {
        getPosition(player.token, this.user_id, response => {
            this.area_id = response[0];
            if (this.area_id == area.id) {
                let x = parseFloat(response[1]);
                let y = parseFloat(response[2]);
                if (first) {
                    this.position = createVector(x, y);
                    this.to = this.position;
                    this.from = this.position;
                } else {
                    this.lerp_step = 0;
                    this.from = this.position;
                    this.to = createVector(x, y);
                    this.direction = this.to.copy().sub(this.from).normalize();
                }
            }
        });
    }
}