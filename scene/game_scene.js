import { Actions } from "../actions.js";
import { BattleFsm, BattleStates } from "../battle_fsm/battle_fsm.js";
import { Engine } from "../engine.js";
import { Monster } from "../game_objects/monster.js";
import { Player } from "../game_objects/player.js";
import { IMGUI, Rectangle } from "../imgui.js";
import Scene from "./scene.js";

export class GameScene extends Scene {
    onEnter() {
        this.fsm = new BattleFsm(this);
        Actions.onBattleStateChanged.add((state) => {
            console.log("Battle state changed to: " + state);
            this.state = state;
        });
        this.state = BattleStates.READY;
        this.player = new Player("Player", 100, [1,3]);
        this.monsters = [
            new Monster("Monster 1", 100, [1,2]),
            new Monster("Monster 1", 100, [1,2]),
        ];
        this.player.armor = 10;

    }

    update(dt) {
        this.fsm.onUpdate(dt);
    }

    render() {
        Engine.sketch.background(255);
        let padding = 200;
        this.renderBattle(new Rectangle(padding, 0, Engine.sketch.width - padding * 2, Engine.sketch.height / 2));
    }

    renderBattle(battlePanel) {
        battlePanel.draw();

        let imgSize = 128;
        let panelSize = imgSize + 50;
        if (this.player) {
            let playerPanel = new Rectangle(battlePanel.x, battlePanel.y + battlePanel.h - panelSize - 50, panelSize, panelSize);

            let hpPanelPadding = 5;
            let hpPanelWidth = playerPanel.w - hpPanelPadding * 2;
            let hpPanelHeight = 30;

            playerPanel.draw();
            IMGUI.image(playerPanel, playerPanel.w / 2 - imgSize / 2, 0, imgSize, imgSize, Engine.resources.images.player, true);
            let hpPanel = new Rectangle(playerPanel.x + hpPanelPadding, playerPanel.y + playerPanel.h - hpPanelHeight - hpPanelPadding, hpPanelWidth, hpPanelHeight);
            hpPanel.draw();

            let armorIconSize = 42;
            let armorPanel = new Rectangle(hpPanel.x, hpPanel.y, hpPanelWidth, hpPanelHeight);
            armorPanel.draw();

            if (this.player.armor > 0) {
                IMGUI.rect(armorPanel, 0, 0, armorPanel.w, armorPanel.h, [200, 200, 200, 255]);
            }
            
            let hpPercent = this.player.hp / this.player.maxHp;
            let hpBarPadding = 5;
            let hpBarWidth = hpPanelWidth - hpBarPadding * 2;
            let hpBarHeight = hpPanelHeight - hpBarPadding * 2;
            IMGUI.rect(hpPanel, hpBarPadding, hpBarPadding, hpBarWidth, hpBarHeight, [53, 53, 53, 255]);
            IMGUI.rect(hpPanel, hpBarPadding, hpBarPadding, hpBarWidth * hpPercent, hpBarHeight, [200, 0, 0, 255]);

            let leftArmorPanel = new Rectangle(armorPanel.x - 10, armorPanel.y, armorPanel.h, armorPanel.h);

            if (this.player.armor > 0) {
                let textSize = 18;
                IMGUI.image(leftArmorPanel, (leftArmorPanel.w - armorIconSize) / 2, (leftArmorPanel.h - armorIconSize) / 2, armorIconSize, armorIconSize, Engine.resources.images.armor);
                IMGUI.text(leftArmorPanel, leftArmorPanel.w / 2, leftArmorPanel.h / 2 - 10, this.player.armor, textSize, [255, 255, 255, 255]);
            }
        }

        for (let i = 0; i < this.monsters.length; i++) {    
            let monsterPanel = new Rectangle(battlePanel.x + battlePanel.w - i * panelSize - panelSize, battlePanel.y + battlePanel.h - panelSize - 50, panelSize, panelSize);
            monsterPanel.draw();
            IMGUI.image(monsterPanel, monsterPanel.w / 2 - imgSize / 2, 0, imgSize, imgSize, Engine.resources.images.monster, false);
            let hpPanel = new Rectangle(monsterPanel.x + 5, monsterPanel.y + imgSize, monsterPanel.w - 10, 20);
            hpPanel.draw();
            let armorPanel = new Rectangle(monsterPanel.x + 5, monsterPanel.y + imgSize + 25, monsterPanel.w - 10, 20);
            armorPanel.draw();
        }
    }

    onExit() {
        console.log("Exiting scene...");
    }
}