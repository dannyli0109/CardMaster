import { Engine } from "../../../engine.js";
import { IMGUI, TooltipTypes } from "../../../imgui.js";
import { Card, CardTypes, ELementColors } from "../card.js";

export class ElementCard extends Card {
    constructor(name, description, targets, element) {
        super(name, description, targets);
        this.element = element;
        this.panel = null;
    }

    draw(cardPanel) {
        IMGUI.circle(cardPanel, cardPanel.w / 2, cardPanel.h / 2, cardPanel.h / 2, ELementColors[this.element]);
        super.draw(cardPanel);
        Engine.clickables.push(this);
    }

    getType() {
        return CardTypes.Element;
    }
    
    toolTip() {
        return [
            {type: TooltipTypes.Text, data: [this.name, 48]},
            {type: TooltipTypes.Circle, data: [[ELementColors[this.element]], 25]},
            {type: TooltipTypes.Text, data: [this.description, 32]}
        ]
    }
}