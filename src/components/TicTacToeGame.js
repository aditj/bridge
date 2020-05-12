
function IsVictory(cells) {
    
    // Winning Positions

    const positions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  // Function to see if a particular row is complete
    const isRowComplete = row => {
    // Mapping winning position to actual cells
      const symbols = row.map(i => cells[i]);
      // Checking for all values of a row equal
      return symbols.every(i => i !== null && i === symbols[0]);
    };
  // Checking all winning positions 
    return positions.map(isRowComplete).some(i => i === true);
  }

function IsDraw(cells){
  return cells.filter(c=> c===null).length===0;
}


export const TicTacToe= setupData =>  ({

  name: "tic-tac-toe",
  setup: (ctx)=> ({
    
    m:setupData.m,
    n:setupData.n,
    
    cells: Array(setupData.m * setupData.n).fill(null)}),
  moves: {
    clickCell: (G,ctx,id) => {
      G.cells[id]=ctx.currentPlayer;
    },
    

  },
  turn: { moveLimit: 1 },

  endIf: (G,ctx) => {
    if (IsVictory(G.cells)){
      return {winner:ctx.currentPlayer};
    }
    if (IsDraw(G.cells)){
      return {draw:true};
    }

  },


});