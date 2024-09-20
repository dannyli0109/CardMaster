export class Character {
    constructor(name, hp, speeds) {
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.speeds = speeds;
        this.buffs = [];
        this.armor = 0;
        this.position = [0, 0];
    }
}