
import React from 'react';
//import logo from './logo.svg';
import  TicTacToeBoard   from './components/TicTacToeBoard.js';
import  { TicTacToe }  from './components/TicTacToeGame.js';
import { SocketIO } from "boardgame.io/multiplayer";

import './App.css';
import { Client } from 'boardgame.io/react';

// import { Local } from 'boardgame.io/multiplayer';
// const PORT = process.env.PORT || 8800;

import React from 'react';
import { Lobby } from 'boardgame.io/react';
import { default as TicTacToeBoard} from '../components/TicTacToeBoard';
import { default as TicTacToe } from '../components/TicTacToeGame';
import './lobby.css';


const hostname = window.location.hostname;
const importedGames = [
  { game: TicTacToe, board: TicTacToeBoard },
];



var setupData={
  m:3,
  n:3,
}

// const server = 'http://localhost:'+PORT;
const TicTacToeClient = Client({
  game: TicTacToe(setupData),
  board: TicTacToeBoard,
  multiplayer: SocketIO({server: 'http://localhost:8000'}),
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playerID: null,n:3,m:3 };;
    this.handleChangem = this.handleChangem.bind(this);
    this.handleChangen  = this.handleChangen.bind(this);
  } 
  handleChangem(event){
    this.setState({m: event.target.value});
    setupData.m=event.target.value;
  }
  handleChangen(event){
    this.setState({n: event.target.value});
    setupData.n=event.target.value;
  }
  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <input onChange={this.handleChangem} />
        <input onChange={this.handleChangen} />
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
        
        <TicTacToeClient playerID={this.state.playerID} data={{m:this.state.m}} n={this.state.n} />
      </div>
    );
  }
}

export default App;

