import { ClickableTypes, Engine } from "../../engine.js";
import { IMGUI } from "../../imgui.js";

export const CardTypes = {
    Element: 0,
    Action: 1,
    Alchemy: 2
}

export const ElementTypes = {   
    None: 0,
    Fire: 1,
    Water: 2,
    Wind: 3,
    Any: 4
}

export const ELementColors = [
    [255, 255, 255, 255],
    [255, 69, 0, 255],
    [0, 191, 255, 255],
    [144, 238, 144, 255],
    [128, 128, 128, 255]
]

export class Card {
    constructor(name, description, targets) {
        this.name = name;
        this.description = description;
        this.panel = null;
        this.clicked = false;
        this.canTarget = targets;
    }

    play(targets = []) {
        // console.log("Playing card");
    }

    draw(cardPanel) {
        this.panel = cardPanel;
        let color = this.clicked ? [255, 0, 0, 255] : [0, 0, 0, 255];
        let strokeWeight = this.clicked ? 5 : 1;
        this.panel.draw(color, strokeWeight);
        Engine.hoverables.push(this);
    }

    isHovered() {
        if (this.panel == null) {
            return false;
        }

        let x = this.panel.x;
        let y = this.panel.y;
        let w = this.panel.w;
        let h = this.panel.h;

        return IMGUI.isHovered(x, y, w, h);
    }

    onHover() {
        if (this.isHovered()) {
            // IMGUI.rectOutline(this.panel, -10, -10, this.panel.w + 20, this.panel.h + 20, [255, 0, 0, 255], 5);
            IMGUI.tooltip(this.panel.x, this.panel.y - 12, 200, 20, this.toolTip());
        }
    }

    onClick() {
        this.clicked = true;
    }

    onSelectable() {
        if (this.panel) {
            IMGUI.rectOutline(this.panel, -10, -10, this.panel.w + 20, this.panel.h + 20, [0, 255, 0, 255], 5);
        }
    }

    onOtherClick() {
        this.clicked = false;
    }

    toolTip() {
        return [
            {type: 0, data: [this.name, 48]},
            {type: 0, data: [this.description, 32]}
        ]
    }

    getType() {
        
    }

    clickableType() {
        return ClickableTypes.Card;
    }

    getTargets(characters) {
        console.log(characters);
        return characters.filter(c => this.canTarget.includes(c.characterType()));
    }

    isSelectable() {
        return true;
    }

    onCancle() {
        this.clicked = false;
    }
}