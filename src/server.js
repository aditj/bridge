const Server = require('boardgame.io/server').Server;
const TicTacToe= require('./components/TicTacToeGame').TicTacToe;
const server= Server({ games: [TicTacToe]})
const PORT = process.env.PORT || 8000;

server.run(PORT)