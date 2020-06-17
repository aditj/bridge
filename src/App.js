/* eslint-disable no-unused-vars */
import React from 'react';
// eslint-disable-next-line
import TicTacToeBoard from './games/TicTacToe/TicTacToeBoard.js';
// eslint-disable-next-line
import { TicTacToe } from './games/TicTacToe/TicTacToeGame.js';
import axios from 'axios';
import './App.css';
// eslint-disable-next-line
import { Lobby } from 'boardgame.io/react';
import logger from 'redux-logger';
import { applyMiddleware, compose } from 'redux';
import { SocketIO, Local } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { FiftySixGame } from './games/FiftySix/FiftySixGame.js'
import FiftySixBoard from './games/FiftySix/FiftySixBoard.js'
const FiftySix = Client({
  game: FiftySixGame,
  numPlayers: 6,
  board: FiftySixBoard,
  multiplayer: Local(),
  debug: false,
  enhancer: compose(
    (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  ),
});

const server = `https://${window.location.hostname}`;
const importedGames=[
  {game:TicTacToe,board:TicTacToeBoard},
  {game:FiftySixGame,board:FiftySixBoard}
]

// Main app react component
class App extends React.Component {
  // constructor 
  constructor(props) {
    super(props);
    this.state = { n: 3, m: 3, numPlayers: 2, devState: null };
  }
  // Handle create button click
  handleClick = (e) => {
    // prevent page reload
    e.preventDefault();
    // AJAX request to create a room
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
  // Functions to handle change of input variables
  updateM = (event) => {
    this.setState({ m: event.target.value });
  }
  updateN = (event) => {
    this.setState({ n: event.target.value });
  }
  updatePlayers = (event) => {
    this.setState({ numPlayers: event.target.value });
  }
  // Render the content
  render() {
    if (this.state.devState === null) {
      return(
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ devState: "dev" })}>
            Dev 56
          </button>
          <button onClick={() => this.setState({ devState: "play" })}>
            Play
          </button>
        </div>
      );
    } else if (this.state.devState === 'play') {
      return(
        <div>
          {/* // Bootstrap container css class */}
          <div className='container'>
            {/* form to create room */}
            {/* <form >
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

        </form> */}
            {/* Lobby component from boardgames.io  */}

            <div>
              <Lobby gameServer={server} lobbyServer={server} gameComponents={ importedGames } />
            </div>
          </div>
        </div>
        );

    } else {
      return(
        <div>
          <FiftySix playerID="0" />
          <FiftySix playerID="1" />
          <FiftySix playerID="2" />
          <FiftySix playerID="3" />
          <FiftySix playerID="4" />
          <FiftySix playerID="5" />
        </div>
      );
    }

  }
}

export default App;
