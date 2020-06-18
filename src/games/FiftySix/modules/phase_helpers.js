
// Phases

// Function to execute when end bidding
export function EndBidding(G,ctx){
    // TODO Add Dynamic first player/current player
    var max=[28,'N'];  
    
    var player='0';
    for(var i=0;i<6;i++){
        if(max[0]<G.bids[i][0]){
            max=G.bids[i];
            player=i;
        }

    }
    // TODO  Add tracking of bets

    G.trump=max[1];
    // TODO Better way to change the next player? 
    G.playerNext=player;

}


// Function to check whether to  end bidding
export function CheckEndBidding(G,ctx){
    for(var i=0;i<6;i++){
        if(G.bids[i][0]===0){
            
            return false;
        }
    }
    
    return true;
    
}
// Function to check whether to end the minified game 
// TODO Add declaration of winner 
export function EndPlay(G){
    for(var i=0;i<6;i++){
        if(G.players[i].cards.length!==0){
            return false;
        }
    }
    
    return true;
}