import { Engine } from "./engine.js";

export class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
    draw(color = [0, 0, 0, 255], strokeWeight = 1) {
        Engine.sketch.push();
        // Engine.sketch.drawingContext.shadowColor = Engine.sketch.color(332, 58, 91, 255);
        // Engine.sketch.drawingContext.shadowBlur = 10;
        Engine.sketch.stroke(...color);
        Engine.sketch.strokeWeight(strokeWeight);
        Engine.sketch.noFill();
        Engine.sketch.rect(this.x, this.y, this.w, this.h);
        // Engine.sketch.drawingContext.shadowBlur = 0;
        Engine.sketch.pop();
    }

    static intersects(r1, r2) {
        return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y;
    }

    static contains(r, x, y) {
        return x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h;
    }
}

export const TooltipTypes = {
    Text: 0,
    Image: 1,
    Circle: 2
}

export const IMGUI = {
    getMousePos() {
        return {
            x: Engine.sketch.mouseX / Engine.scale,
            y: Engine.sketch.mouseY / Engine.scale
        };
    },
    button(panel, x, y, w, h, text, fontSize = 16) {
        let mousePos = IMGUI.getMousePos();
        let isHovered = mousePos.x > x + panel.x && mousePos.x < x + panel.x + w && mousePos.y > panel.y + y && mousePos.y < panel.y + y + h;
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
    text(panel, x, y, text, fontSize = 16, color = [0, 0, 0, 255], outline = [0, 0, 0, 255]) {
        Engine.sketch.push();
        Engine.sketch.fill(...color);
        Engine.sketch.stroke(...outline);
        Engine.sketch.strokeWeight(3);
        // Engine.sketch.textStyle(Engine.sketch.BOLD);
        Engine.sketch.textSize(fontSize);
        Engine.sketch.textFont(Engine.resources.fonts.smileySans);
        Engine.sketch.textAlign(Engine.sketch.CENTER, Engine.sketch.TOP);
        Engine.sketch.text(text, x + panel.x, y + panel.y);
        Engine.sketch.pop();
    },
    image(panel, x, y, w, h, img, flippped = false) {
        IMGUI.rect(panel, x, y, w, h, [128, 128, 128, 255]);
        if (flippped) {
            Engine.sketch.push();
            Engine.sketch.translate(x + w + panel.x, y + panel.y);
            Engine.sketch.scale(-1, 1);
            // Engine.sketch.image(img, 0, 0, w, h);
            Engine.sketch.pop();
            return;
        }
        // Engine.sketch.image(img, x + panel.x, y + panel.y, w, h);
    },
    rect(panel, x, y, w, h, color) {
        Engine.sketch.push();
        Engine.sketch.fill(...color);
        Engine.sketch.rect(x + panel.x, y + panel.y, w, h);
        Engine.sketch.pop();
    },
    rectOutline(panel, x, y, w, h, color, strokeWeight = 1) {
        Engine.sketch.push();
        Engine.sketch.stroke(...color);
        Engine.sketch.strokeWeight(strokeWeight);
        Engine.sketch.noFill();
        Engine.sketch.rect(x + panel.x, y + panel.y, w, h);
        Engine.sketch.pop();
    },
    circle(panel, x, y, r, color) {
        Engine.sketch.push();
        Engine.sketch.fill(...color);
        Engine.sketch.stroke(0);
        Engine.sketch.strokeWeight(1);
        Engine.sketch.ellipse(x + panel.x, y + panel.y, r * 2, r * 2);
        Engine.sketch.pop();
    },
    wrapText(txt, maxWidth) {
        let words = txt.split(' ');
        let lines = [];
        let currentLine = "";
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let testLine = currentLine + word;
            let testWidth = Engine.sketch.textWidth(testLine);
            if (testWidth > maxWidth) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        return lines
    },
    tooltip(x, y, width, padding, elementArray) {
        let currentY = y;
        Engine.sketch.push();
        Engine.sketch.textFont(Engine.resources.fonts.smileySans);
        
        for (let i = 0; i < elementArray.length; i++) {
            if (elementArray[i].type == TooltipTypes.Text) {
                let [text, fontSize] = elementArray[i].data;
                Engine.sketch.textSize(fontSize);
                Engine.sketch.textAlign(Engine.sketch.CENTER, Engine.sketch.TOP);
                let lines = IMGUI.wrapText(text, width).map(line => {
                    return {
                        type: 0, 
                        data: [line, fontSize]
                    }
                });
                elementArray.splice(i, 1, ...lines);
                i += lines.length - 1;
            }
        }

        let fullHeight = IMGUI.getTooltipHeight(width, padding, elementArray);
        let offsetY = fullHeight;

        if (y - offsetY < 0) {
            offsetY = y;
        }
        
        if (y > Engine.height) {
            y = Engine.height;
            currentY = Engine.height;
        }

        if (x < 0) {
            x = 0;
        }

        if (x + width > Engine.width) {
            x = Engine.width - width;
        }

        IMGUI.rect({x: 0, y: 0}, x, y - offsetY, width, fullHeight, [255, 255, 255, 255]);

        for (let i = 0; i < elementArray.length; i++) {
            if (elementArray[i].type == TooltipTypes.Text) {
                let [text, fontSize] = elementArray[i].data;
                Engine.sketch.push();
                Engine.sketch.textSize(fontSize);
                Engine.sketch.textAlign(Engine.sketch.CENTER, Engine.sketch.TOP);
                let textHeight = Engine.sketch.textAscent() + Engine.sketch.textDescent();
                Engine.sketch.text(text, x + width / 2, currentY - offsetY + padding);
                Engine.sketch.pop();
                currentY += textHeight;
            }

            if (elementArray[i].type == TooltipTypes.Image) {
                let [imgs, w, h] = elementArray[i].data;
                let gap = 10;
                let fullW = imgs.length * w + (imgs.length - 1) * gap;
                for (let j = 0; j < imgs.length; j++) {
                    let img = imgs[j];
                    let imgX = x + width / 2 - fullW / 2 + j * (w + gap);
                    Engine.sketch.image(img, imgX, currentY - offsetY + padding, w, h);
                }
                currentY += h;
            }

            if (elementArray[i].type == TooltipTypes.Circle) {
                let [colors, r] = elementArray[i].data;
                let gap = 10;
                let fullW = (colors.length) * r * 2 + (colors.length - 1) * gap;
                for (let j = 0; j < colors.length; j++) {
                    Engine.sketch.push();
                    Engine.sketch.fill(...colors[j]);
                    let currentX = x + width / 2 - fullW / 2 + j * (r * 2 + gap);
                    Engine.sketch.stroke(0);
                    Engine.sketch.strokeWeight(1);
                    Engine.sketch.ellipse(currentX + r, currentY - offsetY + padding + r, r * 2, r * 2);
                    Engine.sketch.pop();
                }
                currentY += r * 2;
            }
        }
        Engine.sketch.pop();
    },
    getTooltipHeight(width, padding, elementArray) {
        let currentHeight = 0;
        Engine.sketch.push();
        Engine.sketch.textFont(Engine.resources.fonts.smileySans);
        
        for (let i = 0; i < elementArray.length; i++) {
            let type = elementArray[i].type;
            if (type == TooltipTypes.Text) {
                let [text, fontSize] = elementArray[i].data;
                Engine.sketch.textSize(fontSize);
                Engine.sketch.textAlign(Engine.sketch.CENTER, Engine.sketch.TOP);
                let lines = IMGUI.wrapText(text, width).map(line => {
                    return {
                        type: 0, 
                        data: [line, fontSize]
                    }
                });
                for (let j = 0; j < lines.length; j++) {
                    let [text, fontSize] = lines[j].data;
                    Engine.sketch.textSize(fontSize);
                    let textHeight = Engine.sketch.textAscent() + Engine.sketch.textDescent();
                    currentHeight += textHeight;
                }
            }

            if (type == TooltipTypes.Image) {
                let [img, w, h] = elementArray[i].data;
                currentHeight += h;
            }

            if (type == TooltipTypes.Circle) {
                let [colors, r] = elementArray[i].data;
                currentHeight += r * 2;
            }
        }

        let fullHeight = currentHeight + padding * 2;
        Engine.sketch.pop();
        return fullHeight;
    },
    isHovered(x, y, w, h) {
        let mx = Engine.sketch.mouseX / Engine.scale;
        let my = Engine.sketch.mouseY / Engine.scale;
        return mx > x && mx < x + w && my > y && my < y + h;
    }
}