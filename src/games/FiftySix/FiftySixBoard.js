import React,{ Component } from "react";
import "../board.css";
import './fiftysixboard.css';
export default class FiftySixBoard extends Component {
    // modularize methods of this component
    // method to call the Bidding Move
    constructor(props) {
        super(props);
        this.state = {
            bid: 0,
            trump:'N',
        }
    }
    PlayCard(cardId) {
        this.props.moves.PlayCard(cardId);
    }
    Bid(){
        this.props.moves.Bid(this.state.bid,this.state.trump);
    }
    render(){
        let cards=[];
        for(let i=0;i<this.props.G.players[this.props.playerID].cards.length;i++){
            cards.push(<div className='card' id={i} key={i} onClick={(e)=>this.PlayCard(e.target.id)}>{this.props.G.players[this.props.playerID].cards[i]}</div>);
        }
        let currentCards=[];
        for(let j=0;j<6;j++){
            currentCards[j]=<div className='card' id={j} key={j}></div>;
        }
        for(let j=0;j<(this.props.G.currentCards.length|0);j++){
            currentCards[j]=<div className='card' id={j} key={j}>{this.props.G.currentCards[j][1]}</div>;
        }
        return(
            <div>
            
            <label>Bid Amount</label>
            <input name='bid' type='number' onChange={(e)=>this.setState({bid:e.target.value})}></input>
            <label>Trump</label>
            <select  onChange={(e)=>this.setState({trump:e.target.value})} >
                <option value='N' defaultChecked='True'>No Trump</option>
                <option value='♠'>Spades</option>
                <option value='♣️'>Clubs</option>
                <option value='♥️'>Hearts</option>
                <option value='♦️'>Diamonds</option>

            </select>
            <button onClick={()=>this.Bid()}>Bid!</button>
            <br></br>
            <div className='cards'>{ cards }</div>
            <br></br>
            
            <div className='current-cards'>{ currentCards }</div>

                </div>
        );
    }
}