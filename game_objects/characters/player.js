import { Engine } from "../../engine.js";
import { IMGUI, Rectangle, TooltipTypes } from "../../imgui.js";
import { Deck } from "../cards/deck.js";
import { Character, TargetType } from "./character.js";

export class Player extends Character {
    constructor(name, hp, speeds) {
        super(name, hp, speeds);
        this.deck = new Deck();
        this.hand = [];
        this.clicked = false;
    }

    draw(playerPanel) {
        let imgSize = 128;
        let hpPanelPadding = 5;
        let hpPanelWidth = playerPanel.w - hpPanelPadding * 2;
        let hpPanelHeight = 30;

        IMGUI.image(playerPanel, playerPanel.w / 2 - imgSize / 2, 0, imgSize, imgSize, Engine.resources.images.player, true);
        let hpPanel = new Rectangle(playerPanel.x + hpPanelPadding, playerPanel.y + playerPanel.h - hpPanelHeight - hpPanelPadding, hpPanelWidth, hpPanelHeight);
        hpPanel.draw();

        let armorIconSize = 42;
        let armorPanel = new Rectangle(hpPanel.x, hpPanel.y, hpPanelWidth, hpPanelHeight);
        armorPanel.draw();

        if (this.armor > 0) {
            IMGUI.rect(armorPanel, 0, 0, armorPanel.w, armorPanel.h, [200, 200, 200, 255]);
        }
        
        let hpPercent = this.hp / this.maxHp;
        let hpBarPadding = 5;
        let hpBarWidth = hpPanelWidth - hpBarPadding * 2;
        let hpBarHeight = hpPanelHeight - hpBarPadding * 2;
        IMGUI.rect(hpPanel, hpBarPadding, hpBarPadding, hpBarWidth, hpBarHeight, [53, 53, 53, 255]);
        IMGUI.rect(hpPanel, hpBarPadding, hpBarPadding, hpBarWidth * hpPercent, hpBarHeight, [200, 0, 0, 255]);

        let leftArmorPanel = new Rectangle(armorPanel.x - 10, armorPanel.y, armorPanel.h, armorPanel.h);

        if (this.armor > 0) {
            let textSize = 32;
            IMGUI.image(leftArmorPanel, (leftArmorPanel.w - armorIconSize) / 2, (leftArmorPanel.h - armorIconSize) / 2, armorIconSize, armorIconSize, Engine.resources.images.armor);
            IMGUI.text(leftArmorPanel, leftArmorPanel.w / 2, leftArmorPanel.h / 2 - 20, this.armor, textSize, [255, 255, 255, 255]);
        }

        if (this.currentSpeed >= 0) {
            let speedPanel = new Rectangle(playerPanel.x + playerPanel.w - 25, playerPanel.y - 25, 50, 50);
            IMGUI.circle(speedPanel, 25, 25, 25, [255]);
            IMGUI.text(speedPanel, 25, 5, this.currentSpeed, 32, [255]);
        }
        super.draw(playerPanel);
    }

    getCardsByType(type) {
        return this.deck.getCardsByType(type);
    }

    drawCard() {
        this.hand.push(this.deck.drawCard());
    }

    discardCard(card) {
        this.deck.discardCard(card);
        this.hand = this.hand.filter(c => c !== card);
    }

    exileCard(card) {
        this.deck.exileCard(card);
        this.hand = this.hand.filter(c => c !== card);
    }

    getDrawPile() {
        return this.deck.drawPile;
    }

    getDiscardPile() {
        return this.deck.discardPile;
    }

    getExilePile() {
        return this.deck.exilePile;
    }

    toolTip() {
        return [
            {type: TooltipTypes.Text, data: [this.name, 48]}
        ]
    }

    characterType() {
        return TargetType.Player;
    }
}