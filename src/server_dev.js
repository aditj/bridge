// Server for development

const Server = require('boardgame.io/server').Server;
const TicTacToe = require('./components/TicTacToeGame').TicTacToe;
var setupData={
    m:4,
    n:3,
  }
const server = Server({ games: [TicTacToe(setupData)] });
server.run(8000);