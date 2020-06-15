// Function to shuffle an array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// Function to return a new deck specifically for the game of 56
export function new_deck(){
    // Making a combinatorial matching of Numbers and Houses 
    var cards = [].concat(...['A', '9', 'K', 'Q', 'J', '9'].map(d => ['♠', '♣️', '♦️', '♥️'].map(e => "".concat(d, e))));
    // Combine two decks for 56
    cards = [].concat(...new Array(2).fill(cards));
    // Return Shuffled Cards
    return shuffle(cards);
}