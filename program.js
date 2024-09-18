import { Engine } from './engine.js';

export default class Program {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        
    }

    update(dt) {
        Engine.sceneManager.update(dt);
    }

    draw() {
        Engine.sceneManager.render();
    }
}