class Locale extends HUD {
    constructor() {
        super();
        this.index = -1;
        this.width = -1;
        this.height = -1;
        this.show();
    }

    set(data) {
        this.index = data.index;
        this.name = data.name;
        this.width = data.width;
        this.height = data.height;
    }

    draw() {
        if (this.visible) {
            if ((this.index > -1) && (this.width > -1) && (this.height > -1)) {
                let padding = 4;
                let box_width = 12;
                for (let j = 0; j < this.height; j++) {
                    for (let i = 0; i < this.width; i++) {
                        let bool = (j * this.width + i) == this.index;
                        fill(color(255, 255, 255, bool ? 128 : 32));
                        rect(
                            ((i + 1) * padding) + (i * box_width),
                            ((j + 1) * padding) + (j * box_width),
                            box_width, box_width
                        )
                    }
                }
            //  fill(color(255, 255, 255, 128));
            //  textSize(box_width + padding);
            //  text(this.name, ((this.width + 2) * padding) + (this.width * box_width), padding);
            }
        }
    }
}