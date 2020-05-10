import React from 'react';
//import logo from './logo.svg';
import  TicTacToeBoard   from './components/TicTacToeBoard.js';
import  { TicTacToe }  from './components/TicTacToeGame.js';
import { SocketIO } from "boardgame.io/multiplayer";

import './App.css';
import { Client } from 'boardgame.io/react';
// import { Local } from 'boardgame.io/multiplayer';
const PORT = process.env.PORT || 8800;

const server = 'http://localhost:'+PORT;
const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: SocketIO(),
});
class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
    return (
      <div>
        <TicTacToeClient playerID={this.state.playerID} />
      </div>
    );
  }
}

export default App;
