import { Engine } from "../../../engine.js";
import { IMGUI, TooltipTypes } from "../../../imgui.js";
import { Card, CardTypes } from "../card.js";

export class AlchemyCard extends Card {
    constructor(name, description, targets, required) {
        super(name, description, targets);
        this.required = required;
        this.flipped = false;
        this.currentCosts = [];
    }

    draw(cardPanel) {
        IMGUI.image(cardPanel, 0, 0, cardPanel.w, cardPanel.w, Engine.resources.images.inventory);
        IMGUI.text(cardPanel, cardPanel.w / 2, cardPanel.h - 25, this.required, 48, [255, 255, 255, 255]);
        if (this.flipped) {
            IMGUI.text(cardPanel, cardPanel.w / 2, cardPanel.h / 2 - 25, "翻面", 48, [255, 255, 255, 255]);
        }
        super.draw(cardPanel);
        Engine.clickables.push(this);
    }

    getType() {
        return CardTypes.Alchemy;
    }

    toolTip(curProgress = false) {
        let remainingCosts = curProgress ? Math.max(this.getRemainingCosts(), 0) : this.required;
        return  [
            {type: TooltipTypes.Text, data: [this.name, 48]},
            {type: TooltipTypes.Image, data: [[Engine.resources.images.inventory], 100, 100]},
            {type: TooltipTypes.Text, data: [`素材：${remainingCosts}`, 48]},
            {type: TooltipTypes.Text, data: [this.description, 32]}
        ];
    }

    getRemainingCosts() {
        // cost can have multiple elements with the same type, also any element, consume any element last
        let count = 0;
        for (let i = 0; i < this.currentCosts.length; i++) {
            count += this.currentCosts[i].currentCosts.length;
        }
        return this.required - count;
    }

    addCost(element) {
        let remainingCosts = this.getRemainingCosts();
        if (remainingCosts > 0) {
            this.currentCosts.push(element);
            return true;
        }
        return false;
    }

    removeCost(element) {
        this.currentCosts = this.currentCosts.filter(ele => ele != element);
    }

    canPlay() {
        return this.getRemainingCosts() <= 0;
    }

    onCancle() {
        this.currentCosts = [];
        this.clicked = false;
    }

    play(targets = []) {
        this.flipped = true;
    }

    isSelectable() {
        return !this.flipped;
    }

    unlock() {
        this.flipped = false;
    }
}