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
        this.props.moves.PlayCard(cardId);
    }
    Bid() {
        //TODO Add limits of a bid i.e. 28-56 
        this.props.moves.Bid(this.state.bid, this.state.trump);
    }
    render() {
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
        let currentBids = [];
        for (let k = 0; k < (this.props.G.bids.length | 0); k++) {
            currentBids.push(<div className='bid'>{this.props.G.bids[k]}</div>)
        }
        let messages = [];
        for (let k = 0; k < (this.props.G.messages.length | 0); k++) {
            messages.push(<div className='message'>{this.props.G.messages[k][1]}: {this.props.G.messages[k][0]}</div>)
        }
        return (
            <div>
                Player ID: {this.props.playerID} , Team: {this.props.G.players[this.props.playerID]['team']}
                <br></br>
                <div>
                <label>Bid Amount</label>
                <input defaultValue='28' name='bid' type='number' onChange={(e) => this.setState({ bid: e.target.value })}></input>
                <br></br>
                <label>Trump</label>
                <select onChange={(e) => this.setState({ trump: e.target.value })} >
                    <option value='N' defaultChecked='True'>No Trump</option>
                    <option value='♠'>Spades</option>
                    <option value='♣️'>Clubs</option>
                    <option value='♥️'>Hearts</option>
                    <option value='♦️'>Diamonds</option>

                </select>
                <button onClick={() => this.Bid()}>Bid!</button>
                </div>
                <br></br>
                <div className='cards'> 
                
                    {cards}
                </div>
                <div className='chat-box'>
                <div className='messages'>
                    {messages}
                </div>
                <div>
                    <input type='text' onChange={e=>{this.setState({message:e.target.value})}}></input>
                    <button onClick={() => this.Message()}>Message</button>

                </div>
                </div>
                <div className='bid-board'>
                    Current Player:
            <br></br>
                    {this.props.ctx.currentPlayer}
                    <br></br>
                    Points:
                    <br></br>
                    Team 0:{this.props.G.points[0]}<br></br>
                    Team 1:{this.props.G.points[1]}<br></br>
            Trump: <br></br>
                    {this.props.G.trump}
                    <br></br>
            Current Bids:
                {currentBids}
                </div>
                <div className='card-table'>
                <label id='card-table-label'>Card Table</label>

                <div className='current-cards'>
                    {currentCards}
                </div>
                
                </div>
                
            </div>
        );
    }
}