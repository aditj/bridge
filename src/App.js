import React from 'react';
//import logo from './logo.svg';
import  TicTacToeBoard   from './components/TicTacToeBoard.js';
import  { TicTacToe }  from './components/TicTacToeGame.js';
import { SocketIO } from "boardgame.io/multiplayer";

import './App.css';
import { Client,Lobby } from 'boardgame.io/react';
// import { Local } from 'boardgame.io/multiplayer';
// const PORT = process.env.PORT || 8800;
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
const LobbyView = () => (
  <div style={{ padding: 50 }}>
    <h1>Lobby</h1>

    <Lobby
      gameServer={`http://localhost:8000`}
      lobbyServer={`http://localhost:8000`}
      gameComponents={[{game:TicTacToe,board:TicTacToeBoard,}]}
    />
  </div>
);

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
 <LobbyView />
         

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
