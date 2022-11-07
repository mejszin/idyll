class Inventory extends HUD {
    constructor(data = {}) {
        super();
        this.data = data;
    }

    draw() {
        if (this.visible) {
            fill('#FFFFFF');
            text('INVENTORY', 16, 16);
        }
    }
}