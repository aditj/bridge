// Function to see if Victory condition is reached
function IsVictory(cells,m,n) {
  // Array to contain all possible victory condition
  var positions = [];
  // Horizontal
  for (var i = 0; i < m; i++) {
    // eslint-disable-next-line no-loop-func
    positions.push([...Array(n).keys()].map(x => n * i + x));
  }

  // Vertical
  for (var l = 0; l < n; l++) {
    // eslint-disable-next-line no-loop-func
    positions.push([...Array(m).keys()].map(x => l + x * m));
  }
  // Diagnol
  i = Math.min(m, n);

  positions.push([...Array(i).keys()].map(x => x * (i + 1)));
  positions.push([...Array(i).keys()].map(x=>4+(4*x)));
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
// Game Constant to be passed into boardgames.io Lobby/Client/Server
export const TicTacToe = {
  name: "tic-tac-toe",

  setup: (ctx,setupData) => ({
    m: Number(setupData.m),
    n: Number(setupData.n),
    cells: Array(Number(setupData.m)*Number(setupData.n)).fill(null)
  }),

  moves: {
    clickCell(G, ctx, id) {
      if (G.cells[id] === null) {
        G.cells[id] = ctx.currentPlayer;
      }
    }
  },
  
  turn: { moveLimit: 1 },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells,G.m,G.n)) {
      return { winner: ctx.currentPlayer };
    }
    // Draw Conditions
    if (G.cells.filter(c => c === null).length === 0) {
      return { draw: true };
    }
  }
};
