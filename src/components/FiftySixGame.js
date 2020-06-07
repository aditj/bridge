// This file has been written in TypeScript
// instead of the usual Vanilla Javascript as was done in TicTacToe
// Reasons for this is to increase readability and to better define types
// which will be helpful in debugging
import { PlayerView } from 'boardgame.io/core';
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
var cards = [].concat(...['A', '9', 'K', 'Q', 'J', '9'].map(d => ['♠', '♣️', '♦️', '♥️'].map(e => "".concat(d, e))));
cards = new Array(2).fill(cards).flat();
export const FiftySixGame = {
    name: '56',
    // can include setupData while creating a custom implementation of 56 game
    setup: (ctx, setupData) => {
        const deck = shuffle(cards);
        var start = { pts: [0, 0],
            startPlayer: 0, players: {
                0: { cards: [], team: 0 },
                1: { cards: [], team: 1 },
                2: { cards: [], team: 0 },
                3: { cards: [], team: 1 },
                4: { cards: [], team: 0 },
                5: { cards: [], team: 1 },
            }, deck: deck, };
        for (let i = 0; i < 8; i++) {
            start.players[0].cards.push(start.deck.pop() || '');
            start.players[1].cards.push(start.deck.pop() || '');
            start.players[2].cards.push(start.deck.pop() || '');
            start.players[3].cards.push(start.deck.pop() || '');
            start.players[4].cards.push(start.deck.pop() || '');
            start.players[5].cards.push(start.deck.pop() || '');
        }
        return start;
    },
    minPlayers:6,
    playerView: PlayerView.STRIP_SECRETS,
    moves: {},
};
