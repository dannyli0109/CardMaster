import { ClickableTypes, Engine } from "../../engine.js";
import { IMGUI } from "../../imgui.js";

export const TargetType = {
    Player: 0,
    Enemy: 1,
    EnemyAll: 2,
    All: 3,
    Prevous: 4
}

export class Character {
    constructor(name, hp, speeds) {
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.speeds = speeds;
        this.buffs = [];
        this.armor = 0;
        this.position = [0, 0];
        this.currentSpeed = -1;
        this.clicked = false;
        this.panel = null;
    }

    
    rollSpeed() {
        this.currentSpeed = this.speeds[Math.floor(Math.random() * this.speeds.length)];
    }

    draw(characterPanel) {
        this.panel = characterPanel;
        let color = this.clicked ? [255, 0, 0, 255] : [0, 0, 0, 255];
        let strokeWeight = this.clicked ? 5 : 1;
        this.panel.draw(color, strokeWeight);
        Engine.hoverables.push(this);
        Engine.clickables.push(this);
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
            let mosuePos = IMGUI.getMousePos();
            IMGUI.tooltip(mosuePos.x, mosuePos.y, 200, 20, this.toolTip());

            // IMGUI.rectOutline(this.panel, -10, -10, this.panel.w + 20, this.panel.h + 20, [255, 0, 0, 255], 5);
        }
    }

    onClick() {
        this.clicked = true;
    }

    onOtherClick() {
        this.clicked = false;
    }

    onSelectable() {
        if (this.panel) {
            IMGUI.rectOutline(this.panel, -10, -10, this.panel.w + 20, this.panel.h + 20, [0, 255, 0, 255], 5);
        }
    }

    toolTip() {
        return [
            {type: 0, data: [this.name, 48]}
        ];
    }

    clickableType() {
        return ClickableTypes.Character;
    }
}