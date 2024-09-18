export class Widget {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.children = [];
        this.parent = null;
    }

    addChild(child) {
        this.children.push(child);
        child.parent = this;
    }

    getX() {
        return this.x + (this.parent ? this.parent.getX() : 0);
    }

    getY() {
        return this.y + (this.parent ? this.parent.getY() : 0);
    }
}