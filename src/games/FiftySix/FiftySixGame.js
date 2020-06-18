
import { PlayerView, TurnOrder } from 'boardgame.io/core';
import { new_deck } from './modules/setup_helpers.js';
import { Bid, PlayCard,Message } from './modules/moves.js'
import { EndBidding, CheckEndBidding,EndPlay } from './modules/phase_helpers';

export const FiftySixGame = {
    name: '56',
    // can include setupData while creating a custom implementation of 56 game
    setup: (ctx, setupData) => {
        // Define a start variable which will be returned by the setup function and will form the base of the Game object G.
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
            messages:[],
            deck: new_deck(),
            trump: 'T',
            bids: Array(6).fill([0, 'T']),

        };
        // Populate the cards array of each of the player object by pushing them .
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
    // Phases for the game
    phases: {
        bid: {
            moves: { Bid ,Message},
            endIf: (G, ctx) => CheckEndBidding(G, ctx), 
            onEnd: (G, ctx) => EndBidding(G, ctx),
            next: 'play',
            start: true,


        },

        play: {
            // REMEMBER The move object is seperate from the overall moves.
            moves: { PlayCard,Message },
            next: 'bid',
            endIf:(G,ctx)=>EndPlay,
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
    // This playerView parameter helps remove parts of the game object you don't want the player to see, e.g. other people's cards.
    playerView: PlayerView.STRIP_SECRETS,
    minPlayers:6,
    maxPlayers:6,
    
    moves: {
        Bid,
        PlayCard,
        Message,
    }
};
