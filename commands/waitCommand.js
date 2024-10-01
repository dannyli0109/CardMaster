import { CommandState } from "./command.js";

export function waitCommand(cmdTime) {
    let _state = CommandState.NOT_EXECUTED;
    let time = 0;
    return {
        execute: function() {
            // Do nothing
            _state = CommandState.EXECUTED;
            time = cmdTime;
        },
        update: function(dt) {
            time -= dt;
            if (time <= 0) {
                _state = CommandState.FINISHED;
            }
        },
        state: () => _state
    };
}