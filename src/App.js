import React from 'react';
//import logo from './logo.svg';
import TicTacToeBoard from './components/TicTacToeBoard.js';
import { TicTacToe } from './components/TicTacToeGame.js';
// import { SocketIO } from "boardgame.io/multiplayer";
import axios from 'axios';
//import $ from 'jquery';
import './App.css';
import { Lobby } from 'boardgame.io/react';
// import { Local } from 'boardgame.io/multiplayer';
// const PORT = process.env.PORT || 8800;

// const server = 'http://localhost:'+PORT;
// const TicTacToeClient = Client({
//   game: TicTacToe,
//   board: TicTacToeBoard,
//   multiplayer: SocketIO({server: 'http://localhost:8000'}),
// });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { n: 3, m: 3, numPlayers: 2 };
  }

  handleClick = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: '/games/tic-tac-toe/create',
      data: {
        numPlayers: this.state.numPlayers,
        setupData: {
          m: this.state.m,
          n: this.state.n,
        }
      }
    });
  }

  updateM = (event) => {
    this.setState({ m: event.target.value });
  }
  updateN = (event) => {
    this.setState({ n: event.target.value });
  }
  updatePlayers = (event) => {
    this.setState({ numPlayers: event.target.value });
  }
  render() {

    return (

      <div className='container'>

        <form >
          <div className='form-group'>
            <label htmlFor='m'>Rows:</label>
            <input
              className='form-control'
              type="number"
              id='m'
              defaultValue='3'
              onChange={this.updateM}

            />
          </div>
          <div className='form-group'>
            <label htmlFor='n'>Columns:</label>
            <input
              className='form-control'
              type="number"
              id='n'
              defaultValue='3'
              onChange={this.updateN}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='players'>No. Of Players:</label>
            <input
              className='form-control'
              type="number"
              id='players'
              defaultValue='2'
              onChange={this.updatePlayers}
            />
          </div>
          <input
            className='form-control btn btn-primary'
            type="button"

            value="Create Tic Tac Toe Room"
            onClick={this.handleClick}
          />

        </form>

        <Lobby
          gameServer={'https://' + window.location.hostname}
          lobbyServer={'https://' + window.location.hostname}
          gameComponents={[{ game: TicTacToe, board: TicTacToeBoard, }]}
        />

      </div>
    );


  }
}

export default App;
