
// Phases

// Function to execute when end bidding
export function EndBidding(G){
    // TODO Add Dynamic first player/current player
    var max=[28,'N'];    
    // eslint-disable-next-line no-unused-vars
    var player='0';
    for(var i=0;i<6;i++){
        if(max[0]<G.bids[i][0]){
            max=G.bids[i];
            player=i;
        }

    }
    // TODO  Add tracking of bets
    // TODO Add changing the next players
    console.log(max[-1])

    G.trump=max[-1];
}



// Function to check whether to end the minified game 
export function EndPlay(G){
    for(var i=0;i<6;i++){
        if(G.players[i].cards.length!==0){
            return false;
        }
    }
    
    return true;
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