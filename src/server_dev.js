// Server for development

import { Server } from 'boardgame.io/server';
import { TicTacToe } from './games/TicTacToe/TicTacToeGame';
import { FiftySixGame } from './games/FiftySix/FiftySixGame.js';

// Server class from boardgames.io
const server = Server({ games: [TicTacToe,FiftySixGame] });
server.run(8000);