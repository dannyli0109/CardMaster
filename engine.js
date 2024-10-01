export const ClickableTypes = {
    Card: 0,
    Character: 1,
}


export const Engine = {
    sceneManager: null,
    scenes: [],
    hoverables: [],
    clickables: [],
    sketch: null,
    mouseIsClicked: false,
    resources: {
        images: {},
        fonts: {}
    },
    _promises: [],
    loadFont: (name, path) => {
        let promise = new Promise((resolve, reject) => {    
            Engine.sketch.loadFont(path, (font) => {
                Engine.resources.fonts[name] = font;
                resolve();
            });
        });
        Engine._promises.push(promise);
        return promise;
    },
    loadImage: (name, path) => {
        let promise = new Promise((resolve, reject) => {    
            Engine.sketch.loadImage(path, (img) => {
                Engine.resources.images[name] = img;
                resolve();
            });
        });
        Engine._promises.push(promise);
        return promise;
    },
    ready: () => {
        return Promise.all(Engine._promises);
    },
}