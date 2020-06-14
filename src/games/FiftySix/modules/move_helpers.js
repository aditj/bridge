function CalculatePoints(array) {
    var map={
        'J':3,
        '9':2,
        'A':1,
        'K':0,
        'Q':0,

    }
    var points=0;
    for(var i=0;i<6;i++){
        points += map[array[i][1][0]]
    }
    return points;
}
// Function to decide the winnner
// TODO Check for ruffing
function DecideWinner(G){
    var trump=G.trump;
    
    var map={
        'J':5,
        '9':4,
        'A':3,
        'K':2,
        'Q':1,

    }
    var winner;
    winner=G.currentCards[0];
    if(trump==='N'){
        
        for(var i =1;i<6;i++){
            if (map[winner[1][0]]<map[G.currentCards[i][1][0]]){
                winner=G.currentCards[i]
            }
        }
        return winner;

    }
    else {
        var isTrumpPlayed=true;
        for (i =0;i<6 ; i++){
            if(isTrumpPlayed){
                if(G.currentCards[i][1][1]===trump){
                    if (map[winner[1][0]]<map[G.currentCards[i][1][0]]){
                        winner=G.currentCards[i]
                    }
                }
                else{
                    continue
                }

            }
            else if(G.currentCards[i][1][1]===trump){
                isTrumpPlayed=true;     
                winner=G.currentCards[i]
                

            }
            else {
                if (map[winner[1][0]]<map[G.currentCards[i][1][0]]){
                    winner=G.currentCards[i]
                }


            }
        }
        return winner;
    }

}

// function to execute after each turn

export function EndPlayTurn(G,ctx){
    if(G.players.length===6){
        
    
    var winner=DecideWinner(G)[0];
    var points=CalculatePoints(G.currentCards);
    G.points[G.players[winner].team]+=points;
    G.currentCards=[]
    ctx.events.endTurn({ next: winner });
    }
    

}
// function to check if turn needs to be ended
export function EndPlayTurnCheck(G){
    if(G.currentCards.length===6){
        return true;
    }
    return false;

}