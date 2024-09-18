import { Engine } from "../engine.js";
import Scene from "./scene.js";

export class GameScene extends Scene {
    onEnter() {
       
    }

    update(dt) {
    }

    render() {
        Engine.sketch.background(255);
    }

    onExit() {
        console.log("Exiting scene...");
    }
}