// Moves 
import {EndPlayTurn,EndPlayTurnCheck} from './move_helpers.js'


// Move to play a card
export const PlayCard={
    move:(G,ctx,cardId)=>{
        G.currentCards.push([ctx.currentPlayer,G.players[ctx.currentPlayer].cards[cardId]]);
        G.players[ctx.currentPlayer].cards.splice(cardId,1);
        G.players[ctx.currentPlayer].numTurns--;
        // TODO is there a better way than setting a playerNext inside G?
        // checking if a 'round' is over
        if(EndPlayTurnCheck(G)){
            // decide the next player
            G.playerNext=EndPlayTurn(G,ctx);

        }
        else{
            // decide the next player
            G.playerNext=(ctx.playOrderPos + 1) % 6;
        }
    },
    client:false,
        
}
// Move to bid

export const Bid={
    move:(G,ctx,bid,trump)=>{
        G.bids[ctx.currentPlayer]=[bid,trump];

    },
    client:false,
};
// Move for messaging --- TODO DEPRECATE THIS
export const Message={
    move:(G,ctx,message,ID)=>{
        G.messages.push([message,ID]);

    },
    noLimit:true,
    client:false,
};