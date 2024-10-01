import { CommandState } from "./command.js";

export function drawCommand(character) {
    let _state = CommandState.NOT_EXECUTED;
    return {
        execute: function() {
            character.drawCard();
            _state = CommandState.FINISHED;
        },
        update: function(dt) {
            // Do nothing
        },
        state: () => _state
    };
}