export default class Scene {
    // Called when the scene is entered
    onEnter() {
        console.log("Entering scene...");
    }

    // Called every frame to update the scene logic
    update(dt) {
        console.log("Updating scene...");
    }

    // Called every frame to render the scene
    render() {
        console.log("Rendering scene...");
    }

    // Called when the scene is exited
    onExit() {
        console.log("Exiting scene...");
    }
}