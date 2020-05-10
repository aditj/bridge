import { Server } from 'boardgame.io/server';
import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import { TicTacToe } from './components/TicTacToeGame';

const server = Server({ games: [TicTacToe] });
const PORT = process.env.PORT || 8800;

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, '../build');

// Serve the build directory
const static_pages = new Koa();
static_pages.use(serve(frontEndAppBuildPath));
server.app.use(mount('/', static_pages));
server.run(PORT, () => {
  server.app.use(
    async (ctx, next) => await serve(frontEndAppBuildPath)(
      Object.assign(ctx, { path: 'index.html' }),
      next
    )
  )
});