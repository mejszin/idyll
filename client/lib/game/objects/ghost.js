function getGhosts() {
    ghosts = [];
    area.players.forEach(user_id => {
        if (user_id != player.user_id) {
            ghosts.push(new Ghost(user_id));
        }
    });
    return ghosts;
}

class Ghost extends Character {
    constructor(user_id) {
        super(user_id);
        getTile(player.token, 'monster_eye_right', (tile) => { this.images.right = tile });
        getTile(player.token, 'monster_eye_down' , (tile) => { this.images.down  = tile });
        getTile(player.token, 'monster_eye_up'   , (tile) => { this.images.up    = tile });
        getTile(player.token, 'monster_eye_left' , (tile) => { this.images.left  = tile });
        getPosition(player.token, user_id, position => {
            this.position = createVector(position[1], position[2]);
            this.to = this.position;
            this.from = this.position;
        });
    }
}