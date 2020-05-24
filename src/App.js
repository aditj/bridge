import React from 'react';
import TicTacToeBoard from './components/TicTacToeBoard.js';
import { TicTacToe } from './components/TicTacToeGame.js';
import axios from 'axios';
import './App.css';
import { Lobby } from 'boardgame.io/react';
// Main app react component
class App extends React.Component {
  // constructor 
  constructor(props) {
    super(props);
    this.state = { n: 3, m: 3, numPlayers: 2 };
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

    return (
      // Bootstrap container css class
      <div className='container'>
        {/* form to create room */}
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
        {/* Lobby component from boardgames.io  */}
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
