class Chat extends HUD {
    constructor() {
        super();
        this.message = '';
    }

    append(str) {
        if (str.length == 1) {
            this.message += str;
        }
    }

    backspace() {
        this.message = this.message.slice(0, -1);
    }

    send() {
        console.log(player.username, 'says', this.message);
        newChat(player.token, this.message, response => {
            this.cancel();
        });
    }

    cancel() {
        this.message = '';
        this.hide();
    }

    draw() {
        if (this.visible) {
            fill('#AA00FF');
            rect(0, height - 40, 200, 40)
            fill('#FFFFFF');
            text(this.message, 16, height - 32);
        }
    }
}