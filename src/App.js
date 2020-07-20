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

const server = `http://${window.location.hostname}:8000`;
const importedGames = [
  { game: TicTacToe, board: TicTacToeBoard },
  { game: FiftySixGame, board: FiftySixBoard }
]

// Main app react component
class App extends React.Component {
  // constructor 
  constructor(props) {
    super(props);
    this.state = { n: 3, m: 3, numPlayers: 6, devState: 'play' };
  }
  // Handle create button click
  handleClick = (e) => {
    // prevent page reload
    e.preventDefault();
    if (e.target.value === 'Create Room') {
      // AJAX request to create a room
      axios({
        method: 'post',
        url: `${server}/games/56/create`,
        data: {
          numPlayers: this.state.numPlayers,
          // Can add setupData if needed.
          unlisted: document.getElementById('unlisted').checked,
        }
      })
        .then(function (response) {
          document.getElementById('room-id').value=response.data.gameID
          alert('Room Created with ID: '+response.data.gameID+'\n Share This ID with people you want to join.\n And join the room yourself with your name.')
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
    if (e.target.value === 'Join Room') {
      // AJAX request to join a room
      let gameID = document.getElementById('room-id').value;
      let name = document.getElementById('name').value;
      let curr_state = []
      axios.get(`${server}/games/56/${gameID}`)
        .then(function (response) {
          let next_player=0;
          for(var i=0 ;i<6;i++ ) {
            if(response.data.players[i].name===undefined){
              next_player=i;
              break;
            }
            
          }
          axios({
            method: 'post',
            url: `${server}/games/56/${gameID}/join`,
            data: {
              playerID: next_player,
              playerName: name,
              // Can add additional data if needed.

            }
          })
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }
  // Functions to handle change of input variables
  updateM = (event) => {
    this.setState({ m: event.target.value });
  }
  updateName = (event) => {
    this.setState({ name: event.target.value });
  }
  updateGameID = (event) => {
    this.setState({ gameID: event.target.value });
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
      return (
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
      return (
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
            {/* TODO: Add support for choosing which game. */}
            <form>

              <h2 className='text-center'>Create A new Room</h2>
              <div className='form-check'>

                <input
                  className='form-check-input'
                  type="checkbox"
                  id='unlisted'
                  name='unlisted'

                  defaultChecked={true} />
                <label className='form-check-label' htmlFor='unlisted'>Unlisted</label>
              </div>
              <div className='form-group'>
                <input
                  className='form-control btn btn-primary'
                  type="button"
                  value="Create Room"
                  onClick={this.handleClick}
                />

              </div>
            </form>
            <form>
              <h2 className='text-center'>Join an existing game room</h2>
              <div className='form-group'>
                <label htmlFor='room-id'>Room ID:</label>
                <input
                  className='form-control'
                  type="text"
                  id='room-id'
                  defaultValue=''

                />
                <label htmlFor='name'>Name:</label>
                <input
                  className='form-control'
                  type="text"
                  id='name'
                  defaultValue=''
                />
                <input
                  className='form-control btn btn-primary'
                  type="button"

                  value="Join Room"
                  onClick={this.handleClick}
                />

              </div>
            </form>

            {/* Lobby component from boardgames.io  */}

            <div>
              <Lobby gameServer={server} lobbyServer={server} gameComponents={importedGames} />
            </div>
          </div>
        </div>
      );

    } else {
      return (
        <div>
          <FiftySix playerID="0" />
          {/* <FiftySix playerID="1" />
          <FiftySix playerID="2" />
          <FiftySix playerID="3" />
          <FiftySix playerID="4" />
          <FiftySix playerID="5" /> */}
        </div>
      );
    }

  }
}

export default App;
