import { Widget } from "./widget";

export class Button extends Widget{
    constructor(x, y, w, h, text) {
        super(x, y, w, h);
        this.text = text;
        this.onClick = onClick || (() => {});
        this.onHover = onHover || (() => {});
        this.onLeave = onLeave || (() => {});
    }

    inside() {
        return Engine.sketch.mouseX > this.x && Engine.sketch.mouseX < this.x + this.w && Engine.sketch.mouseY > this.y && Engine.sketch.mouseY < this.y + this.h;
    }

    update(dt) {
        if (this.inside()) {
            this.onHover();
            if (Engine.mouseClicked) {
                this.onClick();
            }
        }
    }

    render() {
        Engine.sketch.fill(255);
        Engine.sketch.rect(this.getX(), this.getY(), this.w, this.h);
        Engine.sketch.fill(0);
        Engine.sketch.text(this.text, this.getX() + this.w / 2, this.getY() + this.h / 2);
    }
}