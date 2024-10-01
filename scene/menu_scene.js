import { Engine } from "../engine.js";
import { IMGUI, Rectangle } from "../imgui.js";
import Scene from "./scene.js";

export default class MenuScene extends Scene {
    onEnter() {
    }

    update(dt) {
    }

    render() {
        Engine.sketch.background(255);
        let panelWidth = 400;
        let panelHeight = 200;  
        this.renderMenu(new Rectangle(Engine.width / 2 - panelWidth / 2, Engine.height / 2 - panelHeight / 2, panelWidth, panelHeight));
    }

    renderMenu(panel) {
        // panel.draw();
        let curHeight = 0;

        IMGUI.text(panel, panel.w / 2, curHeight, "Card Master", 48, [255]);
        curHeight += 100;
        if (IMGUI.button(panel, panel.w / 2 - 150, curHeight, 300, 100, "Play", 32)) {
            Engine.sceneManager.changeScene(Engine.scenes.game);
        }
        curHeight += 75;
    }

    onExit() {
        console.log("Exiting Menu Scene");
    }
}