import React from 'react';
import logo from './logo.svg';
import  TicTacToeBoard   from './TicTacToeBoard.js';
import './App.css';
import { Client } from 'boardgame.io/react';

function IsVictory(cells){

}
function IsDraw(cells){
  return cells.filter(c=> c===null).length===0;
}

const TicTacToe= {
  setup: ()=> ({ cells: Array(9).fill(null)}),
  moves: {
    clickCell: (G,ctx,id) => {
      G.cells[id]=ctx.currentPlayer;
    },
  },
  endIf: (G,ctx) => {
    if (IsVictory(G.cells)){
      return {winner:ctx.currentPlayer};
    }
    if (IsDraw(G.cells)){
      return {draw:true};
    }

  },
};
const App = Client({ game: TicTacToe,board:TicTacToeBoard });

export default App;
