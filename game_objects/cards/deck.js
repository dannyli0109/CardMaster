import { CardTypes } from "./card.js";

export class Deck {
    constructor() {
        this.cards = [];
        this.drawPile = [];
        this.discardPile = [];
        this.exilePile = [];
    }

    shuffle() {
        // Fisher-Yates shuffle
        let currentIndex = this.drawPile.length;
        let temp, randomIndex;
        this.discardPile = [];

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            temp = this.drawPile[currentIndex];
            this.drawPile[currentIndex] = this.drawPile[randomIndex];
            this.drawPile[randomIndex] = temp;
        }
    }

    drawCard() {
        if (this.drawPile.length === 0) {
            this.drawPile = this.getCardsByType(CardTypes.Element);
            this.shuffle();
        }
        return this.drawPile.pop();
    }

    discardCard(card) {
        this.discardPile.push(card);
    }

    exileCard(card) {
        this.exilePile.push(card);
        // remove the card from the deck
        let index = this.cards.indexOf(card);
        if (index > -1) {
            this.cards.splice(index, 1);
        }
    }

    add(card) {
        this.cards.push(card);
    }

    getCardsByType(type) {
        return this.cards.filter(card => card.getType() === type);
    }
}