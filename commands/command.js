export const CommandState = {
    NOT_EXECUTED: 0,
    EXECUTED: 1,
    FINISHED: 2
}


export const Commands = {
    commands: [],
    currentIdx: 0,
    add: function(commands) {
        Commands.commands = Commands.commands.concat(commands);
    },
    update: function(dt) {
        if (Commands.currentIdx < Commands.commands.length) {
            switch(Commands.commands[Commands.currentIdx].state()) {
                // 0: Not executed
                case CommandState.NOT_EXECUTED:
                    Commands.commands[Commands.currentIdx].execute();
                    break;
                // 1: Executed
                case CommandState.EXECUTED:
                    Commands.commands[Commands.currentIdx].update(dt);
                    break;
                // 2: Finished
                case CommandState.FINISHED:
                    Commands.currentIdx++;
                    break;
            }
        }
    },
    isFinished: function() {
        return Commands.currentIdx >= Commands.commands.length;
    },
    clear: function() {
        Commands.commands = [];
        Commands.currentIdx = 0;
    }
}