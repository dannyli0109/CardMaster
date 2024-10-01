import { Actions } from "../actions.js";
import { BattleActionState, BattleDrawCardState, BattleFsm, BattleReadyState, BattleResultState, BattleRollState, BattleStates } from "../battle_fsm/battle_fsm.js";
import { Commands } from "../commands/command.js";
import { drawCommand } from "../commands/drawCommand.js";
import { runFuncCommand } from "../commands/runFuncCommand.js";
import { waitCommand } from "../commands/waitCommand.js";
import { ClickableTypes, Engine } from "../engine.js";
import { ActionCard } from "../game_objects/cards/actionCards/actionCard.js";
import { AlchemyCard } from "../game_objects/cards/alchemyCards/alchemyCard.js";
import { CardTypes, ElementTypes } from "../game_objects/cards/card.js";
import { ElementCard } from "../game_objects/cards/elementCards/elementCard.js";
import { TargetType } from "../game_objects/characters/character.js";
import { Monster } from "../game_objects/characters/monster.js";
import { Player } from "../game_objects/characters/player.js";
import { IMGUI, Rectangle } from "../imgui.js";
import Scene from "./scene.js";

export class GameScene extends Scene {
    onEnter() {
        this.fsm = new BattleFsm(this);
        this.selectedCards = [];
        this.playedCards = [];
        Actions.onBattleStateChanged.add((state) => {
            console.log("Battle state changed to: " + state);
            this.state = state;

            if (this.state == BattleStates.READY) {
                let arr = [];
                let alchemyCards = this.player.getCardsByType(CardTypes.Alchemy).filter(c => c.flipped);
                for (let i = 0; i < alchemyCards.length; i++) {
                    arr.push(
                        runFuncCommand(() => {
                            alchemyCards[i].flipped = false;
                        }),
                        waitCommand(0.1)
                    );
                }
                Commands.add(arr);
                Commands.add([
                    runFuncCommand(() => {
                        this.fsm.changeState(BattleDrawCardState);
                    })
                ]);
            }

            if (this.state == BattleStates.DRAW_CARD) {
                Commands.add(
                    [
                        drawCommand(this.player),
                        waitCommand(0.1),
                        drawCommand(this.player),
                        waitCommand(0.1),
                        drawCommand(this.player),
                        waitCommand(0.1),
                        drawCommand(this.player),
                        waitCommand(0.1),
                        drawCommand(this.player),
                        runFuncCommand(() => {
                            this.fsm.changeState(BattleRollState);
                        })
                    ]
                )
            }

            if (this.state == BattleStates.ROLL) {
                let characters = [this.player, ...this.monsters];
                let commands = [];
                for (let i = 0; i < characters.length; i++) {
                    commands.push(
                        runFuncCommand(() => {
                            characters[i].rollSpeed();
                        }),
                        waitCommand(0.1)
                    );
                }
                commands.push(runFuncCommand(() => {
                    this.fsm.changeState(BattleActionState);
                }));
                Commands.add(commands);
            }

            if (this.state == BattleStates.RESULT) {
                Commands.add([
                    waitCommand(1),
                    runFuncCommand(() => {
                        this.fsm.changeState(BattleReadyState);
                    })
                ]);
            }
        });
        this.state = BattleStates.READY;
        this.player = new Player("Player", 100, [1,3]);
        this.player.deck.add(new AlchemyCard("Card 1", "Description 1", [], 1));
        this.player.deck.add(new AlchemyCard("Card 2", "Description 2", [], 2));
        this.player.deck.add(new AlchemyCard("Card 3", "Description 3", [], 3));
        this.player.deck.add(new AlchemyCard("Card 4", "Description 4", [TargetType.Enemy], 3));
        this.player.deck.add(new AlchemyCard("Card 5", "Description 5", [TargetType.Enemy], 2));
        this.player.deck.add(new AlchemyCard("Card 6", "Description 6", [TargetType.Enemy], 1));

        this.player.deck.add(new ActionCard("Card 1", "Description 1", [TargetType.Enemy], [ElementTypes.Fire]));
        this.player.deck.add(new ActionCard("Card 2", "Description 2", [TargetType.Enemy], [ElementTypes.Water]));
        this.player.deck.add(new ActionCard("Card 3", "Description 3", [TargetType.Enemy],[ElementTypes.Wind]));
        this.player.deck.add(new ActionCard("Card 4", "Description 4", [TargetType.Enemy],[ElementTypes.Fire, ElementTypes.Water]));
        this.player.deck.add(new ActionCard("Card 5", "Description 5", [TargetType.Enemy],[ElementTypes.Fire, ElementTypes.Wind]));
        this.player.deck.add(new ActionCard("Card 6", "Description 6", [TargetType.Enemy],[ElementTypes.Water, ElementTypes.Wind]));
        this.player.deck.add(new ActionCard("Card 7", "Description 7", [TargetType.Enemy],[ElementTypes.Fire, ElementTypes.Water, ElementTypes.Wind]));
        this.player.deck.add(new ActionCard("Card 8", "Description 8", [], [ElementTypes.Water, ElementTypes.Water, ElementTypes.Wind]));
        this.player.deck.add(new ActionCard("Card 9", "Description 9", [], [ElementTypes.Fire, ElementTypes.Fire, ElementTypes.Any]));

        this.player.deck.add(new ElementCard("Card 1", "Description 1", [], ElementTypes.Fire));
        this.player.deck.add(new ElementCard("Card 2", "Description 2", [], ElementTypes.Water));
        this.player.deck.add(new ElementCard("Card 3", "Description 3", [], ElementTypes.Wind));
        this.player.deck.add(new ElementCard("Card 4", "Description 4", [], ElementTypes.Fire));
        this.player.deck.add(new ElementCard("Card 5", "Description 5", [], ElementTypes.Water));
        this.player.deck.add(new ElementCard("Card 6", "Description 6", [], ElementTypes.Wind));
        this.player.deck.add(new ElementCard("Card 7", "Description 7", [], ElementTypes.Fire));
        this.player.deck.add(new ElementCard("Card 8", "Description 8", [], ElementTypes.Water));
        this.player.deck.add(new ElementCard("Card 9", "Description 9", [], ElementTypes.Wind));
        this.player.deck.add(new ElementCard("Card 10", "Description 10", [], ElementTypes.Fire));
        this.player.deck.add(new ElementCard("Card 11", "Description 11", [], ElementTypes.Water));
        this.player.deck.add(new ElementCard("Card 12", "Description 12", [], ElementTypes.Wind));
        this.player.deck.add(new ElementCard("Card 13", "Description 13", [], ElementTypes.Fire));
        this.player.deck.add(new ElementCard("Card 14", "Description 14", [], ElementTypes.Water));
        this.player.deck.add(new ElementCard("Card 15", "Description 15", [], ElementTypes.Wind));

        

        this.monsters = [
            new Monster("Monster 1", 100, [1,2]),
            new Monster("Monster 1", 100, [1,2]),
        ];

        this.monsters[1].armor = 20;
        this.player.armor = 10;
    }


    update(dt) {
        this.fsm.onUpdate(dt);
        Commands.update(dt);
    }

    // #region rendering
    // #region render function
    render() {
        Engine.sketch.background(255);
        let battlePanelPadding = 0;
        let battlePanelW = Engine.width - battlePanelPadding * 2;
        let battlePanelH = 620;
        let battlePanel = new Rectangle(battlePanelPadding, 0, battlePanelW, battlePanelH);
        this.renderBattle(battlePanel);

        let statePanel = new Rectangle(Engine.width / 2 - 100, 50, 200, 100);
        statePanel.draw();
        IMGUI.text(statePanel, statePanel.w / 2, 30, this.fsm.getCurrentStateName(), 48, [255, 255, 255, 255]);

        let gap = 10;
        let cardPanelPadding = 10;
        let cardPanelW = Engine.width - cardPanelPadding * 2;
        let cardPanelH = 450;
        let cardPanel = new Rectangle(cardPanelPadding, battlePanelH + gap, cardPanelW, cardPanelH);
        this.renderCard(cardPanel);

        let handPanelGap = 10;
        let handPanelW = 64 * this.player.hand.length + handPanelGap * (this.player.hand.length - 1);
        let handPanelH = 64;
        let handPanel = new Rectangle(Engine.width / 2 - handPanelW / 2, cardPanel.y - handPanelH / 2, handPanelW, handPanelH);
        this.renderHand(handPanel);

        if (this.state == BattleStates.ACTION) {
            if (IMGUI.button(cardPanel, cardPanel.w - 300 - 10, cardPanel.h - 80 - 10, 300, 80, "结束回合", 32)) {
                let playerHand = this.player.hand;
                let commands = [];
                for (let i = 0; i < playerHand.length; i++) {
                    commands.push(
                        runFuncCommand(() => {
                            this.player.discardCard(playerHand[i]);
                        }),
                        waitCommand(0.1)
                    );
                }

                Commands.add([
                    ...commands,
                    runFuncCommand(() => {
                        this.fsm.changeState(BattleResultState);
                    })
                ]);
            }
        }

        if (this.playedCards.length > 0) {
            // handle select target
            let playedCard = this.playedCards[0];
            if (playedCard.getType() == CardTypes.Action) {
                let targets = playedCard.getTargets(this.monsters);
                let played = false;
                if (targets.length > 0) {
                    let tooltipPanelW = 500;
                    let tooltipW = 300;
                    let cardToolTip = playedCard.toolTip(true);
                    let toolTipHeight = IMGUI.getTooltipHeight(tooltipW, 20, cardToolTip);
                    let toolTipPanel = new Rectangle(battlePanel.x + battlePanel.w / 2  - tooltipPanelW / 2, battlePanel.y + battlePanel.h - toolTipHeight - 30, tooltipPanelW, toolTipHeight);
                    IMGUI.tooltip(toolTipPanel.x, toolTipPanel.y + toolTipHeight, tooltipW, 20, cardToolTip);
    
                    let selectableTargets = targets.filter(t => t.isHovered());
                    selectableTargets.forEach(t => t.onSelectable());
                    if (selectableTargets.length > 0 && Engine.mouseIsClicked) {
                        playedCard.play([selectableTargets[0]]);
                        played = true;
                    }
    
                    let hoverables = targets.filter(h => h.isHovered());
                    if (hoverables.length > 0) {
                        hoverables[0].onHover();
                    }
    
                    if (IMGUI.button(toolTipPanel, tooltipW + 25, toolTipHeight - 75, 150, 75, "取消", 32)) {
                        this.playedCards.forEach(c => c.onCancle());
                        this.playedCards = [];
                    }
                }
                else {
                    playedCard.play();
                    played = true;
                }
    
                if (played) {
                    let commandArray = [];
                    for (let i = 0; i < playedCard.currentCosts.length; i++) {
                        commandArray.push(
                            runFuncCommand(() => {
                                this.player.discardCard(playedCard.currentCosts[i]);
                            }),
                            waitCommand(0.1)
                        );
                    }
                    Commands.add(commandArray);
    
                    this.selectedCards = [];
                    this.playedCards = [];   
                }
            }
            
            // #region Alchemy card action card selection
            if (playedCard.getType() == CardTypes.Alchemy) {
                let targets = playedCard.getTargets(this.monsters);
                let played = false;
                let selectableTargets = targets.filter(t => t.isHovered());
                if (targets.length > 0) {
                    let tooltipPanelW = 500;
                    let tooltipW = 300;
                    let cardToolTip = playedCard.toolTip(true);
                    let toolTipHeight = IMGUI.getTooltipHeight(tooltipW, 20, cardToolTip);
                    let toolTipPanel = new Rectangle(battlePanel.x + battlePanel.w / 2  - tooltipPanelW / 2, battlePanel.y + battlePanel.h - toolTipHeight - 30, tooltipPanelW, toolTipHeight);
                    IMGUI.tooltip(toolTipPanel.x, toolTipPanel.y + toolTipHeight, tooltipW, 20, cardToolTip);
    
                    let selectableTargets = targets.filter(t => t.isHovered());
                    selectableTargets.forEach(t => t.onSelectable());
                    if (selectableTargets.length > 0 && Engine.mouseIsClicked) {
                        played = true;
                    }
    
                    let hoverables = targets.filter(h => h.isHovered());
                    if (hoverables.length > 0) {
                        hoverables[0].onHover();
                    }
    
                    if (IMGUI.button(toolTipPanel, tooltipW + 25, toolTipHeight - 75, 150, 75, "取消", 32)) {
                        this.playedCards.forEach(c => c.onOtherClick());
                        this.playedCards[0].onCancle();
                        this.playedCards = [];
                    }
                }
                else {
                    played = true;
                }

                if (played) {
                    let commandArray = [];
                    for (let i = 0; i < playedCard.currentCosts.length; i++) {
                        commandArray.push(
                            runFuncCommand(() => {
                                playedCard.currentCosts[i].unlock();
                            }),
                            waitCommand(0.1)
                        );
                    }
                    Commands.add(commandArray);
                    
                    playedCard.play(selectableTargets);
                    this.selectedCards = [];
                    this.playedCards = [];
                }
            }
            // #endregion
        }
        else {
            if (this.selectedCards.length > 0) {
                let tooltipPanelW = 500;
                let tooltipW = 300;
                let selectedCard = this.selectedCards[0];
                let cardToolTip = selectedCard.toolTip(true);
                let toolTipHeight = IMGUI.getTooltipHeight(tooltipW, 20, cardToolTip);
                let toolTipPanel = new Rectangle(battlePanel.x + battlePanel.w / 2  - tooltipPanelW / 2, battlePanel.y + battlePanel.h - toolTipHeight - 30, tooltipPanelW, toolTipHeight);
                // toolTipPanel.draw();
                IMGUI.tooltip(toolTipPanel.x, toolTipPanel.y + toolTipHeight, tooltipW, 20, cardToolTip);
                
                // #region Action card element selection
                // Action card element selection
                if (selectedCard.getType() == CardTypes.Action) {
                    let clickables = Engine.clickables.filter(c => c.isHovered() && Engine.mouseIsClicked);
                    let elementCards = clickables.filter(c =>c.clickableType() == ClickableTypes.Card && c.getType() == CardTypes.Element);
                    let selectables = Engine.clickables.filter(c => c.clickableType() == ClickableTypes.Card && c.getType() == CardTypes.Element && c.isHovered());
                    selectables.forEach(s => s.onSelectable());
                    if (elementCards.length > 0) {
                        if (this.selectedCards.includes(elementCards[0])) {
                            this.selectedCards.splice(this.selectedCards.indexOf(elementCards[0]), 1);
                            elementCards[0].onOtherClick();
                            selectedCard.removeCost(elementCards[0]);
                        }
                        else {
                            if (selectedCard.addCost(elementCards[0])) {
                                this.selectedCards.push(elementCards[0]);
                                elementCards[0].onClick();
                            }
                        }
                    }
    
                    if (IMGUI.button(toolTipPanel, tooltipW + 25, toolTipHeight - 75 * 2 - 10, 150, 75, "出牌", 32)) {
                        if (selectedCard.canPlay()) {
                            this.playedCards = [selectedCard];
                            this.selectedCards.forEach(c => c.onOtherClick());
                            this.selectedCards = [];
                        }
                    }
                }
                // #endregion
    
                // #region Alchemy card action card selection

                if (selectedCard.getType() == CardTypes.Alchemy) {
                    let clickables = Engine.clickables.filter(c => c.isHovered() && Engine.mouseIsClicked);
                    let actionCards = clickables.filter(c =>c.clickableType() == ClickableTypes.Card && c.getType() == CardTypes.Action);
                    let selectables = Engine.clickables.filter(c => c.clickableType() == ClickableTypes.Card && c.getType() == CardTypes.Action && c.isHovered() && c.locked);
                    selectables.forEach(s => s.onSelectable());

                    if (actionCards.length > 0) {
                        if (this.selectedCards.includes(actionCards[0])) {
                            this.selectedCards.splice(this.selectedCards.indexOf(actionCards[0]), 1);
                            actionCards[0].onOtherClick();
                            selectedCard.removeCost(actionCards[0]);
                        }
                        else {
                            if (selectedCard.addCost(actionCards[0])) {
                                this.selectedCards.push(actionCards[0]);
                                actionCards[0].onClick();
                            }
                        }
                    }
    
                    if (IMGUI.button(toolTipPanel, tooltipW + 25, toolTipHeight - 75 * 2 - 10, 150, 75, "出牌", 32)) {
                        if (selectedCard.canPlay()) {
                            this.playedCards = [selectedCard];
                            this.selectedCards.forEach(c => c.onOtherClick());
                            this.selectedCards = [];
                        }
                    }
                }
                
                // #endregion

                if (IMGUI.button(toolTipPanel, tooltipW + 25, toolTipHeight - 75, 150, 75, "取消", 32)) {
                    this.selectedCards.forEach(c => c.onOtherClick());
                    this.selectedCards[0].onCancle();
                    this.selectedCards = [];
                }
    
            }
            else {
                let selectables = Engine.clickables.filter(c => {
                    return c.clickableType() == ClickableTypes.Card && c.getType() != CardTypes.ELement && c.isSelectable() && c.isHovered()
                });

                selectables.forEach(s => s.onSelectable());
                if (selectables.length > 0 && Engine.mouseIsClicked) {
                    if (selectables[0].getType() !== CardTypes.Element) {
                        selectables[0].onClick();
                        this.selectedCards = [selectables[0]];
                        
                        for (let i = 0; i < Engine.clickables.length; i++) {
                            if (Engine.clickables[i] != selectables[0]) {
                                Engine.clickables[i].onOtherClick();
                            }
                        }
                    }
                }
                let hoverables = Engine.hoverables.filter(h => h.isHovered());
                if (hoverables.length > 0 && hoverables[0] != this.selectedCards[0]) {
                    hoverables[0].onHover();
                }
            }
        }           

        Engine.hoverables = [];
        Engine.clickables = [];
    }
    // #endregion

    // #region battle rendering
    renderBattle(battlePanel) {
        battlePanel.draw();
        let imgSize = 128;
        let panelSize = imgSize + 50;
        if (this.player) {
            let playerPanel = new Rectangle(battlePanel.x + 200, battlePanel.y + battlePanel.h - panelSize - 50, panelSize, panelSize);
            this.renderPlayer(playerPanel);
        }
        let monsterPadding = 30;

        for (let i = 0; i < this.monsters.length; i++) {    
            let monsterPanel = new Rectangle(battlePanel.x + battlePanel.w - i * (panelSize + monsterPadding) - panelSize - 200, battlePanel.y + battlePanel.h - panelSize - 50, panelSize, panelSize);
            this.renderMonster(monsterPanel, this.monsters.length - i - 1);
        }
    }

    renderPlayer(playerPanel) {
        this.player.draw(playerPanel);
    }

    renderMonster(monsterPanel, index) {
        this.monsters[index].draw(monsterPanel);
    }
    // #endregion

    // #region card rendering
    renderCard(cardPanel) {
        cardPanel.draw();
        let alchemyCardPanelW = 800;
        let alchemyCardPanelH = cardPanel.h / 2;
        this.renderAlchemyCards(new Rectangle(cardPanel.x + cardPanel.w / 2 - alchemyCardPanelW / 2, cardPanel.y, alchemyCardPanelW, alchemyCardPanelH));

        let actionCardPanelW = 1200;
        let actionCardPanelH = cardPanel.h / 2;
        this.renderActionCards(new Rectangle(cardPanel.x + cardPanel.w / 2 - actionCardPanelW / 2, cardPanel.y + alchemyCardPanelH, actionCardPanelW, actionCardPanelH));

        let drawPilePadding = 10;
        let drawPilePanelW = cardPanel.h / 2 - drawPilePadding;
        let drawPilePanelH = drawPilePanelW;
        this.renderDrawPile(new Rectangle(cardPanel.x + drawPilePadding, cardPanel.y + drawPilePadding, drawPilePanelW, drawPilePanelH));

        // getExilePile
        let exilePilePadding = 10;
        let exilePilePanelW =  cardPanel.h / 2 - exilePilePadding;
        let exilePilePanelH = (cardPanel.h / 2 - exilePilePadding * 2) / 2;
        let exilePilePanel = new Rectangle(cardPanel.x + cardPanel.w - exilePilePanelW - exilePilePadding, cardPanel.y + exilePilePadding, exilePilePanelW, exilePilePanelH);
        this.renderExilePile(exilePilePanel);

        // getDiscardPile
        let discardPilePadding = 10;
        let discardPilePanelW = exilePilePanel.w;
        let discardPilePanelH = exilePilePanel.h;
        this.renderDiscardPile(new Rectangle(exilePilePanel.x, exilePilePanel.y + exilePilePanel.h + discardPilePadding, discardPilePanelW, discardPilePanelH));
    }

    renderAlchemyCards(alchemyCardPanel) {
        alchemyCardPanel.draw();
        let cardCount = 6;
        let gap = 10;
        let cardW = (alchemyCardPanel.w - gap * (cardCount - 1)) / cardCount;
        let cardH = cardW;
        let alchemyCards = this.player.getCardsByType(CardTypes.Alchemy);
        for (let i = 0; i < alchemyCards.length; i++) {   
            let cardPanel = new Rectangle(alchemyCardPanel.x + i * (cardW + gap), alchemyCardPanel.y + (alchemyCardPanel.h - cardH) / 2, cardW, cardH);
            alchemyCards[i].draw(cardPanel);
        }
    }
    
    renderActionCards(actionCardPanel) {
        actionCardPanel.draw();
        let cardCount = 9;
        let gap = 10;
        let cardW = (actionCardPanel.w - gap * (cardCount - 1)) / cardCount;
        let cardH = cardW + 50;
        let actionCards = this.player.getCardsByType(CardTypes.Action);
        for (let i = 0; i < actionCards.length; i++) {   
            let cardPanel = new Rectangle(actionCardPanel.x + i * (cardW + gap), actionCardPanel.y + (actionCardPanel.h - cardH) / 2, cardW, cardH);
            actionCards[i].draw(cardPanel);
        }
    }

    renderDrawPile(drawPilePanel) {
        drawPilePanel.draw();
        IMGUI.text(drawPilePanel, drawPilePanel.w / 2, 45, "牌堆", 48, [255, 255, 255, 255]);
        IMGUI.text(drawPilePanel, drawPilePanel.w / 2, 105, this.player.getDrawPile().length, 48, [255, 255, 255, 255]);
    }

    renderExilePile(exilePilePanel) {
        exilePilePanel.draw();
        IMGUI.text(exilePilePanel, exilePilePanel.w / 2, 10, "除外区", 36, [255, 255, 255, 255]);
        IMGUI.text(exilePilePanel, exilePilePanel.w / 2, 55, this.player.getExilePile().length, 36, [255, 255, 255, 255]);
    }

    renderDiscardPile(discardPilePanel) {
        discardPilePanel.draw();
        IMGUI.text(discardPilePanel, discardPilePanel.w / 2, 10, "弃牌堆", 36, [255, 255, 255, 255]);
        IMGUI.text(discardPilePanel, discardPilePanel.w / 2, 55, this.player.getDiscardPile().length, 36, [255, 255, 255, 255]);
    }

    // #endregion

    // #region hand rendering
    renderHand(handPanel) {
        let handPanelGap = 10;
        handPanel.draw();
        let cardW = 64;
        let cardH = 64;
        for (let i = 0; i < this.player.hand.length; i++) {
            let cardPanel = new Rectangle(handPanel.x + i * (handPanelGap + cardW), handPanel.y, cardW, cardH);
            this.player.hand[i].draw(cardPanel);
        }
    }
    // #endregion

    // #endregion

    onExit() {
        console.log("Exiting scene...");
    }
}