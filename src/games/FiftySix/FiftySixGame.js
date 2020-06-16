
import { PlayerView, TurnOrder } from 'boardgame.io/core';
import { new_deck } from './modules/setup_helpers.js';
import { Bid, PlayCard } from './modules/moves.js'
import { EndBidding, CheckEndBidding } from './modules/phase_helpers';

export const FiftySixGame = {
    name: '56',
    // can include setupData while creating a custom implementation of 56 game
    setup: (ctx, setupData) => {

        var start = {
            points: [0, 0],
            startPlayer: 0,
            playerNext: 0,
            currentCards: [],
            players: {
                0: { cards: [], team: 0, numTurns: 8, },
                1: { cards: [], team: 1, numTurns: 8, },
                2: { cards: [], team: 0, numTurns: 8, },
                3: { cards: [], team: 1, numTurns: 8, },
                4: { cards: [], team: 0, numTurns: 8, },
                5: { cards: [], team: 1, numTurns: 8, },
            },

            deck: new_deck(),
            trump: 'T',
            bids: Array(6).fill([0, 'T']),

        };

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
    phases: {
        bid: {
            moves: { Bid },
            endIf: (G, ctx) => CheckEndBidding(G, ctx), // Change Name
            onEnd: (G, ctx) => EndBidding(G, ctx),
            next: 'play',
            start: true,


        },

        play: {
            moves: { PlayCard },
            next: 'play',
            
            turn: {
                moveLimit:1,
                order: {
                    first: (G, ctx) => { return G.playerNext },
                    next: (G, ctx) => {
                        
                        return G.playerNext;
                    }
                }

            }
        },
    },
    turn: {
        moveLimit: 1,
        order: TurnOrder.RESET,
    },
    playerView: PlayerView.STRIP_SECRETS,

    moves: {
        Bid,
        PlayCard,
    }
};
