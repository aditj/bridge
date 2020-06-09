// This file has been written in TypeScript
// instead of the usual Vanilla Javascript as was done in TicTacToe
// Reasons for this is to increase readability and to better define types
// which will be helpful in debugging
import { PlayerView } from 'boardgame.io/core';
import { new_deck }  from './modules.js';


export const FiftySixGame = {
    name: '56',
    // can include setupData while creating a custom implementation of 56 game
    setup: (ctx, setupData) => {
        const deck = new_deck();
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
