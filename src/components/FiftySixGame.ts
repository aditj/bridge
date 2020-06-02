// This file has been written in TypeScript
// instead of the usual Vanilla Javascript as was done in TicTacToe
// Reasons for this is to increase readability and to better define types
// which will be helpful in debugging

var cards:string[]= [].concat(...['A','9','K','Q','J','9'].map(d => ['S','C','D','H'].map(e => [].concat(d, e))))
export const FiftySixGame = {
    name:'56',
    // can include setupData while creating a custom implementation of 56 game
    setup: (ctx:any,setupData:any):any => (
        
        { pts:[0,0],
           startPlayer:0,
        }
    )
    ,
    moves: {

    }



} 