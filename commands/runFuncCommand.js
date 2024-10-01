import { CommandState } from "./command.js";

export function runFuncCommand(func) {
    let _state = CommandState.NOT_EXECUTED;
    return {
        execute: function() {
            func();
            _state = CommandState.FINISHED;
        },
        update: function(dt) {
            // Do nothing
        },
        state: () => _state
    };
}