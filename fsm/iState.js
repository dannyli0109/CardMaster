export class IState {
    /**
     * 进入状态
     * @param params 
     */
    onEnter(...params) {
        // Implementation goes here
    }

    /**
     * 更新状态
     * @param dt
     * @returns
     */
    onUpdate(dt) {
        // Implementation goes here
    }

    /**
     * 退出状态
     */
    onExit() {
        // Implementation goes here
    }
}
