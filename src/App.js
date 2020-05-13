import React from 'react';
//import logo from './logo.svg';
import  TicTacToeBoard   from './components/TicTacToeBoard.js';
import  { TicTacToe }  from './components/TicTacToeGame.js';
// import { SocketIO } from "boardgame.io/multiplayer";
import axios from 'axios';
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
const LobbyView = () => (
  <div style={{ padding: 50 }}>
    <h1>Lobby</h1>

    <Lobby
      gameServer={'https://${window.location.hostname}'}
      lobbyServer={'https://${window.location.hostname}'}
      gameComponents={[{game:TicTacToe,board:TicTacToeBoard,}]}
    />
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {n:3,m:3 };
    
    this.handleClick = this.handleClick.bind(this);
  } 
  handleClick(e){
    e.preventDefault();
   
    axios({
      method: 'post',
      url: '/games/tic-tac-toe/create',
      data: {
        numPlayers:2,
        setupData:{
          m:this.state.m,
          n:this.state.n,
        }
      }
    })
  }
  
  render() {
    
      return (
       
        <div>
           <input 
                type="number"
                id='m'
               
                 onChange={(event)=>this.setState({m:event.target.value})}
                 ref={ref => this.m = ref}
              />
              <input 
                type="number"
                id='n'
              
                onChange={(event)=>this.setState({n:event.target.value})}
              />
               <input 
                type="button"
                
                value="Create Tic Tac Toe Room"
                onClick={this.handleClick}
              />

 <LobbyView />
         

        </div>
      );
          
    
      }
}

export default App;
