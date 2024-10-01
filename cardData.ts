import { ElementTypes } from "./game_objects/cards/card.js";
import { TargetType } from "./game_objects/characters/character.js";

export const CardData = {
    1001: {
        name: "自燃攻击",
        desc: "对敌人造成10点伤害，对自己造成5层灼伤",
        costs: [ElementTypes.Fire],
        effects: [
            { type: "damage", value: 10, target: TargetType.Enemy },
            { type: "burn", value: 5, target: TargetType.Player }
        ]
    },
    1002: {
        name: "蒸汽烧伤",
        desc: "对敌人造成5点伤害，对敌人造成5层灼伤，若敌人已经灼伤则使其易伤1回合",
        costs: [ElementTypes.Water, ElementTypes.Fire],
        effects: [
            { type: "damage", value: 5, target: TargetType.Enemy },
            {
                type: "vulnerable", value: 1, target: TargetType.Enemy, duration: 1, conditions: [
                    { type: "burn", value: 1 }
                ]
            },
            { type: "burn", value: 5, target: TargetType.Enemy },
        ]
    },
    1003: {
        name: "1003",
        desc: "本回合每次攻击额外附加2层灼伤",
        costs: [ElementTypes.Wind, ElementTypes.Fire],
        effects: [
            {
                type: "onAttack", target: TargetType.Enemy, duration: 1, effects: [
                    { type: "burn", value: 2, target: TargetType.Enemy }
                ]
            }
        ]
    },
    1004: {
        name: "1004",
        desc: "对所有敌人和自身造成5点伤害并附加5层灼伤",
        costs: [ElementTypes.Wind, ElementTypes.Fire],
        effects: [
            { type: "burn", value: 5, target: TargetType.All },
            { type: "damage", value: 5, target: TargetType.All }
        ]
    },
    1005: {
        name: "Burn Amplifier",
        desc: "本回合每次赋予灼伤效果时，使其灼伤层数+1",
        costs: [ElementTypes.Fire, ElementTypes.Fire],
        effects: [
            {
                type: "onApplyBurn", target: TargetType.All, value: 1, duration: 1, effects: [
                    { type: "modifyBurn", value: 1 }
                ]
            }
        ]
    },
    1006: {
        name: "1006",
        desc: "自身回复灼伤层数*3点HP",
        costs: [ElementTypes.Wind, ElementTypes.Fire],
        effects: [
            {
                type: "heal", value: { multiplier: 3, status: "burn" }, target: TargetType.Player
            }
        ]
    }
}
