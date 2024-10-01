import { Engine } from "../../../engine.js";
import { IMGUI, TooltipTypes } from "../../../imgui.js";
import { Card, CardTypes, ELementColors, ElementTypes } from "../card.js";

export class ActionCard extends Card {
    constructor(name, description, targets, costs) {
        super(name, description, targets);
        this.costs = costs;
        this.currentCosts = [];
        this.locked = false;
    }

    draw(cardPanel) {
        IMGUI.image(cardPanel, 0, 0, cardPanel.w, cardPanel.w, Engine.resources.images.inventory);
        let gap = 10;
        let fullW = (this.costs.length - 1) * 30 + (this.costs.length - 1) * gap;
        for (let i = 0; i < this.costs.length; i++) {
            let x = (cardPanel.w) / 2 - fullW / 2 + i * (30 + gap);
            IMGUI.circle(cardPanel, x, cardPanel.w + 25, 15, ELementColors[this.costs[i]]);
        }
        if (this.locked) {
            // draw elements at the bottom
            let gap = 10;
            let fullW = (this.currentCosts.length - 1) * 30 + (this.currentCosts.length - 1) * gap;
            for (let i = 0; i < this.currentCosts.length; i++) {
                let x = (cardPanel.w) / 2 - fullW / 2 + i * (30 + gap);
                IMGUI.circle(cardPanel, x, cardPanel.w / 2, 15, ELementColors[this.currentCosts[i].element]);
            }
        }

        super.draw(cardPanel);
        Engine.clickables.push(this);
    }

    getType() {
        return CardTypes.Action;
    }

    getRemainingCosts() {
        // cost can have multiple elements with the same type, also any element, consume any element last
        let costs = this.costs.slice();
        for (let i = 0; i < this.currentCosts.length; i++) {
            let index = costs.indexOf(this.currentCosts[i].element);
            if (index != -1) {
                costs.splice(index, 1);
            }
            else {
                index = costs.indexOf(ElementTypes.Any);
                if (index != -1) {
                    costs.splice(index, 1);
                }
            }
        }

        return costs;
    }

    addCost(element) {
        let remainingCosts = this.getRemainingCosts();
        let index = remainingCosts.indexOf(element.element);
        if (index != -1) {
            this.currentCosts.push(element);
            return true;
        }
        else {
            // check if is any element
            index = remainingCosts.indexOf(ElementTypes.Any);
            if (index != -1) {
                this.currentCosts.push(element);
                return true;
            }
        }
        return false;
    }

    removeCost(element) {
        this.currentCosts = this.currentCosts.filter(ele => ele != element);
    }

    toolTip(curProgress = false) {
        let costs = curProgress ? this.currentCosts.map(ele => ele.element) : this.costs;
        while (costs.length < this.costs.length) {
            costs.push(ElementTypes.None);
        }
        return [
            {type: TooltipTypes.Text, data: [this.name, 48]},
            {type: TooltipTypes.Image, data: [[Engine.resources.images.inventory], 100, 100]},
            {type: TooltipTypes.Circle, data: [costs.map(cost => {
                return [...ELementColors[cost]];
            }), 25]},
            {type: TooltipTypes.Text, data: [this.description, 32]}
        ]
    }

    canPlay() {
        return this.getRemainingCosts().length == 0;
    }

    play(targets = []) {
        // console.log("Playing card");
        this.locked = true;
    }

    isSelectable() {
        return !this.locked;
    }

    onCancle() {
        this.currentCosts = [];
        this.locked = false;
        this.clicked = false;
    }

    unlock() {
        this.locked = false;
        this.currentCosts = [];
    }
}