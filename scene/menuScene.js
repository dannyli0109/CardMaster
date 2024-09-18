import { Engine } from "../engine.js";
import Scene from "./scene.js";

export default class MenuScene extends Scene {
    onEnter() {
    }

    update(dt) {
    }

    render() {
        Engine.sketch.background(255);
    }

    onExit() {
        console.log("Exiting Menu Scene");
    }
}