export class Fsm {
    constructor(owner) {
        this.owner = owner;
        this.stateMap = new Map();
        this._nextState = null;
        this._nextStateParam = [];
        this.currentState = null;
    }

    get states() {
        return this.stateMap;
    }

    /**
     * 强制状态切换
     * @param stateClass
     * @param params 
     */
    forceState(stateClass, ...params) {
        this._nextState = this.stateMap.get(stateClass.name);
        if (!this._nextState) {
            this._nextState = new stateClass(this);
            this.stateMap.set(stateClass.name, this._nextState);
        }
        this._nextStateParam = params;
    }

    /**
     * 切换状态
     * @param stateClass
     * @param params
     * @returns
     *  
     * 1. 如果当前状态和要切换的状态一致，不做任何处理
     * 2. 如果当前状态和要切换的状态不一致，切换到新状态
     */
    changeState(stateClass, ...params) {
        if (this.currentState && this.currentState.constructor.name === stateClass.name) return;
        this.forceState(stateClass, ...params);
    }

    /**
     * 更新主逻辑
     * @param dt 
     */
    onUpdate(dt) {
        if (this._nextState) {
            if (this.currentState) {
                this.currentState.onExit();
            }
            this._nextState.onEnter(...this._nextStateParam);
            this.currentState = this._nextState;
            this._nextState = null;
        }
        if (this.currentState) {
            this.currentState.onUpdate(dt);
        }
    }
}
