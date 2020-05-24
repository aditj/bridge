// Server for development

import { Server } from 'boardgame.io/server';
import { TicTacToe } from './components/TicTacToeGame';
// Server class from boardgames.io
const server = Server({ games: [TicTacToe] });
server.run(8000);