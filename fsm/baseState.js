import { IState } from "./iState.js";

export class BaseState extends IState {
    constructor(fsm) {
        super();
        this.fsm = fsm;
    }

    /**
     * 进入状态
     * @param params 
     */
    onEnter(...params) {
        // Base implementation
    }

    /**
     * 更新状态 (must be implemented by derived classes)
     * @param dt
     */
    onUpdate(dt) {
        throw new Error("onUpdate method must be implemented");
    }

    /**
     * 退出状态
     */
    onExit() {
        // Base implementation
    }
}
