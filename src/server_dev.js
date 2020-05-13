// Server for development

const Server = require('boardgame.io/server').Server;
const TicTacToe = require('./components/TicTacToeGame').TicTacToe;

const server = Server({ games: [TicTacToe] });
server.run(8000);