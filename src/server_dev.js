// Server for development

import { Server } from 'boardgame.io/server';
import { TicTacToe } from './components/TicTacToeGame';

const server = Server({ games: [TicTacToe] });
server.run(8000);