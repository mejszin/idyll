class Chat extends HUD {
    constructor(data = {}) {
        super();
        this.data = data;
        this.text = '';
    }

    append(str) {
        this.text += str;
    }

    send() {
        console.log(player.username, 'says', this.text);
        this.cancel();
    }

    cancel() {
        this.text = '';
        this.hide();
    }

    draw() {
        if (this.visible) {
            fill('#AA00FF');
            rect(0, height - 40, 200, 40)
            fill('#FFFFFF');
            text(this.text, 16, height - 32);
        }
    }
}