// Moves 
// Move to bid
import {EndPlayTurn,EndPlayTurnCheck} from './move_helpers.js'
export function Bid(G,ctx,bid,trump){
    G.bids[ctx.currentPlayer]=[bid,trump];
}
// Move to play a card
export function PlayCard(G,ctx,cardId){
   
    G.currentCards.push([ctx.currentPlayer,G.players[ctx.currentPlayer].cards[cardId]]);
    G.players[ctx.currentPlayer].cards.splice(cardId,1);
    G.players[ctx.currentPlayer].numTurns--;
    if(EndPlayTurnCheck(G)){
        EndPlayTurn(G,ctx)
            }

}
