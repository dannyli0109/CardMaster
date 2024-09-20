export default class SceneManager {
    constructor() {
        this.currentScene = null;
    }

    // Switch to a new scene
    changeScene(newScene) {
        if (this.currentScene) {
            this.currentScene.onExit(); // Call exit on the current scene
        }
        this.currentScene = newScene;
        this.currentScene.onEnter(); // Call enter on the new scene
    }

    // Update the current scene
    update(dt) {
        if (this.currentScene) {
            this.currentScene.update(dt);
        }
    }

    // Render the current scene
    render() {
        if (this.currentScene) {
            this.currentScene.render();
        }
    }
}