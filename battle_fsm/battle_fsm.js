import { Actions } from "../actions.js";
import { BaseState } from "../fsm/baseState.js";
import { Fsm } from "../fsm/fsm.js";

export const BattleStates = {
    READY: 0,
    DRAW_CARD: 1,
    ROLL: 2,
    ACTION: 3,
    RESULT: 4
}

// 战斗状态机
export class BattleFsm extends Fsm {
    constructor(owner) {
        super(owner);
        this.changeState(BattleReadyState);
    }
}

// 战斗基础状态
export class BattleBaseState extends BaseState {
    constructor(fsm) {
        super(fsm);
    }

    notifyState() {
        Actions.onBattleStateChanged.call(this.state);
    }
}

// 准备状态
export class BattleReadyState extends BattleBaseState {
    constructor(fsm) {
        super(fsm);
    }

    get state() {
        return BattleStates.READY;
    }

    onEnter() {
        console.log("Enter ready state");
        this.notifyState();
    }

    onUpdate(dt) {
        console.log("Update ready state");
    }

    onExit() {
        console.log("Exit ready state");
    }
}

// 抽牌状态
export class BattleDrawCardState extends BattleBaseState {
    constructor(fsm) {
        super(fsm);
    }

    get state() {
        return BattleStates.DRAW_CARD;
    }

    onEnter() {
        console.log("Enter draw card state");
        this.notifyState();
    }

    onUpdate(dt) {
        console.log("Update draw card state");
    }

    onExit() {
        console.log("Exit draw card state");
    }
}

// 拼点状态
export class BattleRollState extends BattleBaseState {
    constructor(fsm) {
        super(fsm);
    }

    get state() {
        return BattleStates.ROLL;
    }

    onEnter() {
        console.log("Enter Roll state");
        this.notifyState();
    }

    onUpdate(dt) {
        console.log("Update Roll state");
    }

    onExit() {
        console.log("Exit Roll state");
    }
}

// 行动状态
export class BattleActionState extends BattleBaseState {
    constructor(fsm) {
        super(fsm);
    }

    get state() {
        return BattleStates.ACTION;
    }

    onEnter() {
        console.log("Enter action state");
        this.notifyState();
    }

    onUpdate(dt) {
        console.log("Update action state");
    }

    onExit() {
        console.log("Exit action state");
    }
}

// 结算状态
export class BattleResultState extends BattleBaseState {
    constructor(fsm) {
        super(fsm);
    }

    get state() {
        return BattleStates.RESULT;
    }

    onEnter() {
        console.log("Enter result state");
        this.notifyState();
    }

    onUpdate(dt) {
        console.log("Update result state");
    }

    onExit() {
        console.log("Exit result state");
    }
}

