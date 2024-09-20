import { Engine } from "./engine.js";

export class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
    draw() {
        Engine.sketch.rect(this.x, this.y, this.w, this.h);
    }

    static intersects(r1, r2) {
        return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y;
    }

    static contains(r, x, y) {
        return x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h;
    }
}

export const IMGUI = {
    button(panel, x, y, w, h, text, fontSize = 16) {
        let isHovered = Engine.sketch.mouseX > x && Engine.sketch.mouseX < x + w && Engine.sketch.mouseY > y && Engine.sketch.mouseY < y + h;
        let isPressed = isHovered && Engine.mouseIsClicked;
        // Draw the button
        Engine.sketch.push();
        Engine.sketch.fill(isPressed ? 150 : (isHovered ? 200 : 255));
        Engine.sketch.rect(x + panel.x, y + panel.y, w, h, 5);
        
        // Draw the label
        Engine.sketch.fill(0);
        // Engine.sketch.textStyle(Engine.sketch.BOLD);
        Engine.sketch.textSize(fontSize);
        Engine.sketch.textFont(Engine.resources.fonts.smileySans);
        Engine.sketch.textAlign(Engine.sketch.CENTER, Engine.sketch.CENTER);
        Engine.sketch.text(text, x + w / 2 + panel.x, y + h / 2 + panel.y);
        Engine.sketch.pop();
        
        // Return whether the button was pressed
        return isPressed;
    },
    text(panel, x, y, text, fontSize = 16, color = [0, 0, 0, 255]) {
        Engine.sketch.push();
        Engine.sketch.fill(...color);
        Engine.sketch.stroke(0);
        Engine.sketch.strokeWeight(3);
        // Engine.sketch.textStyle(Engine.sketch.BOLD);
        Engine.sketch.textSize(fontSize);
        Engine.sketch.textFont(Engine.resources.fonts.smileySans);
        Engine.sketch.textAlign(Engine.sketch.CENTER, Engine.sketch.TOP);
        Engine.sketch.text(text, x + panel.x, y + panel.y);
        Engine.sketch.pop();
    },
    image(panel, x, y, w, h, img, flippped = false) {
        if (flippped) {
            Engine.sketch.push();
            Engine.sketch.translate(x + w + panel.x, y + panel.y);
            Engine.sketch.scale(-1, 1);
            Engine.sketch.image(img, 0, 0, w, h);
            Engine.sketch.pop();
            return;
        }
        Engine.sketch.image(img, x + panel.x, y + panel.y, w, h);
    },
    rect(panel, x, y, w, h, color) {
        Engine.sketch.push();
        Engine.sketch.fill(...color);
        Engine.sketch.rect(x + panel.x, y + panel.y, w, h);
        Engine.sketch.pop();
    }
}