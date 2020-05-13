
function IsVictory(cells, m, n) {

  var positions = []

  for (var i = 0; i < m; i++) {
    // eslint-disable-next-line no-loop-func
    positions.push([...Array(n).keys()].map((x) => n * i + x)); 
  }

  // Vertical
  for (i = 0; i < n; i++) {
    // eslint-disable-next-line no-loop-func
    positions.push([...Array(m).keys()].map((x) => i + x * m)); 
  }
  // Diagnol
  i = Math.min(m, n);

  positions.push([...Array(i).keys()].map(x => x * (i + 1)));
  alert(positions);

  // Function to see if a particular row is complete
  const isRowComplete = row => {
    // Mapping winning position to actual cells
    const symbols = row.map(j => cells[j]);
    // Checking for all values of a row equal
    return symbols.every(j => j !== null && j === symbols[0]);
  };
  // Checking all winning positions 
  return positions.map(isRowComplete).some(i => i === true);
}

function IsDraw(cells){
  return cells.filter(c=> c===null).length===0;
}


export const TicTacToe =  ({

  name: "tic-tac-toe",
  setup: (ctx,setupData)=> (setupData?{
    
    m:setupData.m,
    n:setupData.n,
    
    cells: Array(setupData.m * setupData.n).fill(null)}:{m:3,
      n:3,
      
      cells: Array(3 * 3).fill(null)}),
  moves: {
    clickCell: (G,ctx,id) => {
      G.cells[id]=ctx.currentPlayer;
      alert(G.cells);
    },
    

  },
  turn: { moveLimit: 1 },
  minPlayers: 1,

  maxPlayers: 5,
  endIf: (G,ctx) => {
    alert(G.cells);
    if (IsVictory(G.cells,G.m,G.n)){
      return {winner:ctx.currentPlayer};
    }
    if (IsDraw(G.cells,G.m,G.n)){
      return {draw:true};
    }

  },


});