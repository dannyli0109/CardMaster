import { Engine } from "../../engine.js";
import { IMGUI, Rectangle, TooltipTypes } from "../../imgui.js";
import { Character, TargetType } from "./character.js";

export class Monster extends Character {
    constructor(name, hp, speeds) {
        super(name, hp, speeds);
    }

    draw(monsterPanel) {
        let imgSize = 128;
        let hpPanelPadding = 5;
        let hpPanelWidth = monsterPanel.w - hpPanelPadding * 2;
        let hpPanelHeight = 30;
        monsterPanel.draw();
        IMGUI.image(monsterPanel, monsterPanel.w / 2 - imgSize / 2, 0, imgSize, imgSize, Engine.resources.images.monster, false);
        let hpPanel = new Rectangle(monsterPanel.x + hpPanelPadding, monsterPanel.y + monsterPanel.h - hpPanelHeight - hpPanelPadding, hpPanelWidth, hpPanelHeight);
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
            let speedPanel = new Rectangle(monsterPanel.x + monsterPanel.w - 25, monsterPanel.y - 25, 50, 50);
            IMGUI.circle(speedPanel, 25, 25, 25, [255]);
            IMGUI.text(speedPanel, 25, 5, this.currentSpeed, 32, [255]);
        }
        super.draw(monsterPanel);
    }

    toolTip() {
        return [
            {type: TooltipTypes.Text, data: [this.name, 48]}
        ]
    }

    characterType() {
        return TargetType.Enemy;
    }
}