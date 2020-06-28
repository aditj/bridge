import React, { Component } from "react";
import "../board.css";
import './fiftysixboard.css';
export default class FiftySixBoard extends Component {
    // modularize methods of this component
    // method to call the Bidding Move
    constructor(props) {
        super(props);
        this.state = {
            bid: 28,
            trump: 'N',
            message:'',
        }
    }
    Message() {
        this.props.moves.Message(this.state.message,this.props.playerID)
    }
    PlayCard(cardId) {
        // TODO Only Valid cards should be available/active to play
        this.props.moves.PlayCard(cardId);
    }
    Bid() {
        // TODO Add limits of a bid i.e. 28-56 
        // TODO Add Pass 
        this.props.moves.Bid(this.state.bid, this.state.trump);
    }
    render() {
        let team=[];
        let teammates=[];
        let message;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
       message= <div> <h3>Your Player IDs : {this.props.playerID}</h3></div>
        } else {
            // teammates= [(this.props.playerID+2)%6,(this.props.playerID+4)%6];
            // team=[this.props.gameMetadata[teammates[0]]['name'],this.props.gameMetadata[teammates[1]]['name']];
            // message= <div> Hello {this.props.gameMetadata[this.props.playerID]['name']} , Your Team is {this.props.G.players[this.props.playerID]['team']} and your teammates are {team[0]} and {team[1]}</div>
                
        }
        
        let cards = [];
        for (let i = 0; i < this.props.G.players[this.props.playerID].cards.length; i++) {
            cards.push(<div className='card' id={i} key={i} onClick={(e) => this.PlayCard(e.target.id)}>{this.props.G.players[this.props.playerID].cards[i]}</div>);
        }
        let currentCards = [];
        for (let j = 0; j < 6; j++) {
            currentCards.push(<div className='card' id={j} key={j}></div>);
        }
        for (let j = 0; j < (this.props.G.currentCards.length | 0); j++) {
            currentCards[j] = <div className='card' id={j} key={j}>{this.props.G.currentCards[j][1]}</div>;
        }
        let currentPlayers=[]
        for (let j = 0; j < (this.props.G.currentCards.length | 0); j++) {
            currentPlayers[j] = <div className='player' id={j} key={j}>{this.props.G.currentCards[j][0]}</div>;
        }
        let currentBids = [];
        for (let k = 0; k < (this.props.G.bids.length | 0); k++) {
            currentBids.push(<div id={k} key={k} className='bid'>{this.props.G.bids[k][0]+this.props.G.bids[k][1]}</div>)
        }
        let messages = [];
        for (let k = 0; k < (this.props.G.messages.length | 0); k++) {
            messages.push(<div className='message'>{this.props.G.messages[k][1]}: {this.props.G.messages[k][0]}</div>)
        }
        let playArea;
        if(this.props.ctx.phase==='bid'){
            playArea=<div>
            <label><h3>Bid Amount:</h3> </label>
            <br></br>
            <input defaultValue='28'  name='bid' type='number' onChange={(e) => this.setState({ bid: e.target.value })}></input>
            <br></br>
            <label><h3>Trump:</h3> </label>
            <br></br>
            <select onChange={(e) => this.setState({ trump: e.target.value })} >
                <option value='N' defaultChecked='True'>No Trump</option>
                <option value='♠'>Spades</option>
                <option value='♣️'>Clubs</option>
                <option value='♥️'>Hearts</option>
                <option value='♦️'>Diamonds</option>

            </select>
            <button class='btn btn-primary' onClick={() => this.Bid()}>Bid!</button>
            </div>
        }
        else if(this.props.ctx.phase==='play'){
            playArea=  <div className='cards'> 
                
            {cards}
        </div>
        }
        return (
            <div>
                <div className='playArea'>
                {message}
                <br></br>
                <h2>Current Phase: {this.props.ctx.phase}</h2>
                <br></br>
                {playArea}
                <br></br>
              
                <div className='chat-box'>
                <div className='messages'>
                    {messages}
                </div>
                <div>
                    <input type='text' onChange={e=>{this.setState({message:e.target.value})}}></input>
                    <button class='btn btn-success' onClick={() => this.Message()}>Message</button>

                </div>
                </div>
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseBid" aria-expanded="true" aria-controls="collapseBid">
                   Toggle Information
                 </button>
                 </div>
                <div id='collapseBid' className='bid-board'>
               
                    <h2>Current Player:</h2>
                    
            <br></br>
                    {this.props.ctx.currentPlayer}
                    <br></br>
                    <h2>Points:</h2>
                    
                    <br></br>
                    Team 0:{this.props.G.points[0]}<br></br>
                    Team 1:{this.props.G.points[1]}<br></br>
                    <h1>Trump:</h1> <br></br>
                    {this.props.G.trump}
                    <br></br>
            <h1>Current Bids:</h1>
            {currentBids}
                <br></br>
                T: Undefined, N: No Trump
                </div>
                <div className='card-table'>
                <label id='card-table-label'>Card Table</label>

                <div className='current-cards'>
                    {currentCards}
                    {currentPlayers}
                </div>
                
                </div>
                
            </div>
        );
    }
}