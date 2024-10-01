import { Engine } from './engine.js';
import Program from './program.js';



new p5((sketch) => {
    let program;
    Engine._sketch = sketch;

    sketch.preload = () => {    
        // sketch.loadImage('./public/1pxWhite.png', (img) => {
        //     Engine.resources.images["whitePixel"] = img;
        // });
    }

    sketch.setup = () => {
        Engine.sketch = sketch;
        Engine.loadFont("smileySans", "./public/SmileySans-Oblique.otf");
        Engine.loadImage("player", "./public/player.png");
        Engine.loadImage("monster", "./public/monster.png");
        Engine.loadImage("shield", "./public/shield.png");
        Engine.loadImage("armor", "./public/armor.png");
        Engine.loadImage("inventory", "./public/inventory.png");
        Engine.ready().then(() => { 
            Engine.isReady = true;
            Engine.width = 1920;
            Engine.height = 1080;
            Engine.scale = 0.5;
            program = new Program(Engine.width, Engine.height);
        });
        // Engine.loadImage("whitePixel", "./public/1pxWhite.png");
        // Engine.loadImage("panel", "./public/panel-border-012.png");
        // Engine.loadImage("nightBG", "./public/nightBG.png");
        // Engine.loadImage("bg", "./public/bg.png");
        // Engine.loadFont("smileySans", "./public/SmileySans-Oblique.otf");
        // Engine.ready().then(() => { 
        //     Engine.isReady = true;
        //     program = new Program(1280, 720);
        // });

    }

    sketch.draw = () => {
        if (!Engine.isReady) return;
        Engine.sketch.push();
        Engine.sketch.scale(Engine.scale);
        program.update(Engine.sketch.deltaTime / 1000);
        program.draw();
        Engine.mouseIsClicked = false;
        Engine.sketch.pop();
    }

    sketch.mouseClicked = () => {
        Engine.mouseIsClicked = true;
    }   
});


