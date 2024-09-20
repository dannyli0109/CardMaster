export class Action {
    constructor() {
        this.listeners = [];  
    }

    add(listener) {
        // Implementation goes here
        this.listeners.push(listener);
    }

    clear() {   
        // Implementation goes here
        this.listeners = [];
    }

    call(...params) {
        // Implementation goes here
        this.listeners.forEach(listener => {
            listener(...params);
        });
    }
}

export const Actions = {
    onBattleStateChanged: new Action(),
}