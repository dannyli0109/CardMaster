import { Engine } from './engine.js';



new p5((sketch) => {
    let program;
    Engine._sketch = sketch;

    sketch.preload = () => {    
        // sketch.loadImage('./public/1pxWhite.png', (img) => {
        //     Engine.resources.images["whitePixel"] = img;
        // });
    }

    sketch.setup = () => {
        // Engine.loadImage("whitePixel", "./public/1pxWhite.png");
        // Engine.loadImage("panel", "./public/panel-border-012.png");
        // Engine.loadImage("nightBG", "./public/nightBG.png");
        // Engine.loadImage("bg", "./public/bg.png");
        // Engine.loadFont("smileySans", "./public/SmileySans-Oblique.otf");
        // Engine.ready().then(() => { 
        //     Engine.isReady = true;
        //     program = new Program(1280, 720);
        // });
        Engine.createCanvas(1280, 720);
    }

    sketch.draw = () => {
        // if (!program) return;
        // program.update(sketch.deltaTime);
        // program.draw();
        // Engine.mouseClicked = false;
        Engine.background(255);
    }

    sketch.mouseClicked = () => {
        // Engine.mouseClicked = true;
    }
});


