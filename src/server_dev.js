// Server for development

import { Server } from 'boardgame.io/server';
import { TicTacToe } from './components/TicTacToeGame';
import { FiftySixGame } from './components/FiftySixGame.js';

// Server class from boardgames.io
const server = Server({ games: [TicTacToe,FiftySixGame] });
server.run(8000);