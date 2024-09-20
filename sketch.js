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
        Engine.ready().then(() => { 
            Engine.isReady = true;
            program = new Program(1280, 720);
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
        program.update(Engine.deltaTime);
        program.draw();
        Engine.mouseIsClicked = false;
    }

    sketch.mouseClicked = () => {
        Engine.mouseIsClicked = true;
    }   
});


