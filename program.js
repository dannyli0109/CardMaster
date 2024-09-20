import { Engine } from './engine.js';
import { GameScene } from './scene/game_scene.js';
import MenuScene from './scene/menu_scene.js';
import SceneManager from './scene/scene_manager.js';

export default class Program {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        Engine.sceneManager = new SceneManager();
        Engine.scenes = {
            game: new GameScene(),
            menu: new MenuScene()
        }
        Engine.sceneManager.changeScene(Engine.scenes.game);
        Engine.sketch.createCanvas(this.w, this.h);
    }

    update(dt) {
        Engine.sceneManager.update(dt);
    }

    draw() {
        Engine.sceneManager.render();
    }
}