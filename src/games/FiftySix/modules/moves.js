// Moves 
// Move to bid
import {EndPlayTurn,EndPlayTurnCheck} from './move_helpers.js'


// Move to play a card
export const PlayCard={
    move:(G,ctx,cardId)=>{
        G.currentCards.push([ctx.currentPlayer,G.players[ctx.currentPlayer].cards[cardId]]);
        G.players[ctx.currentPlayer].cards.splice(cardId,1);
        G.players[ctx.currentPlayer].numTurns--;
        // TODO is there a better way than setting a playerNext inside G?
        if(EndPlayTurnCheck(G)){
            G.playerNext=EndPlayTurn(G,ctx);

        }
        else{
            G.playerNext=(ctx.playOrderPos + 1) % 6;
        }
    },
    client:false,
        
}

export const Bid={
    move:(G,ctx,bid,trump)=>{
        G.bids[ctx.currentPlayer]=[bid,trump];

    },
    client:false,
};
