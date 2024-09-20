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
        let panelWidth = 300;
        let panelHeight = 150;  
        this.renderMenu(new Rectangle(Engine.sketch.width / 2 - panelWidth / 2, Engine.sketch.height / 2 - panelHeight / 2, panelWidth, panelHeight));
    }

    renderMenu(panel) {
        panel.draw();
        let curHeight = 0;

        IMGUI.text(panel, panel.w / 2, curHeight, "Card Master", 48);
        curHeight += 75;
        if (IMGUI.button(panel, panel.w / 2 - 50, curHeight, 100, 50, "Play")) {
            Engine.sceneManager.changeScene(Engine.scenes.game);
        }
        curHeight += 75;
    }

    onExit() {
        console.log("Exiting Menu Scene");
    }
}