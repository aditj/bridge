// function to calculate points given the cards
function CalculatePoints(array) {
    var map = {
        'J': 3,
        '9': 2,
        'A': 1,
        'K': 0,
        'Q': 0,

    }
    var points = 0;
    for (var i = 0; i < 6; i++) {
        points += map[array[i][1][0]]
    }
    return points;
}
// Function to decide the winnner
function DecideWinner(G) {
    var trump = G.trump;
    var first_player_house = G.currentCards[0][1][1]
    var map = {
        'J': 5,
        '9': 4,
        'A': 3,
        'K': 2,
        'Q': 1,

    }
    var winner;
    // set winner variable to the first card of the current cards
    winner = G.currentCards[0];
    // case for no trump 
    if (trump === 'N') {
        for (var i = 1; i < 6; i++) {
            // only check cards which have house same as the first players house
            if (G.currentCards[i][1][1] === first_player_house) {
                if (map[winner[1][0]] < map[G.currentCards[i][1][0]]) {
                    winner = G.currentCards[i]
                }
            }
        }
        return winner;
    }
    // case for trump 
    else {

        var isTrumpPlayed = true;
        for (i = 0; i < 6; i++) {
            // case if trump has been played
            if (isTrumpPlayed) {
                if (G.currentCards[i][1][1] === trump) {
                    if (map[winner[1][0]] < map[G.currentCards[i][1][0]]) {
                        winner = G.currentCards[i];
                    }
                }
                else {
                    continue;
                }

            }
            // Case trump played for first time
            else if (G.currentCards[i][1][1] === trump) {
                isTrumpPlayed = true;
                winner = G.currentCards[i];


            }
            // Case No trump yet 
            else {
                // only check cards which have house same as the first players house
                if (G.currentCards[i][1][1] === first_player_house) {
                    if (map[winner[1][0]] < map[G.currentCards[i][1][0]]) {
                        winner = G.currentCards[i]
                    }
                }
            }
        }
        return winner;
    }

}

// function to execute after each round (6 players have played their hand) of a play round

export function EndPlayTurn(G, ctx) {
    // decide winner and points
    var winner = DecideWinner(G)[0];
    var points = CalculatePoints(G.currentCards);
    G.points[G.players[winner].team] += points;
    // empty currentCards
    G.currentCards = [];
    return winner;


}

// function to check if turn needs to be ended
export function EndPlayTurnCheck(G) {
    if (G.currentCards.length === 6) {
        return true;
    }
    return false;

}