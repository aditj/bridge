import React,{ Component } from "react";
import "../board.css";

export default class FiftySixBoard extends Component {
    render(){
        let cards=[];
        for(let i=0;i<8;i++){
            cards.push(<td>{this.props.G.players[this.props.playerID].cards[i]}</td>);
        }
        return(
             
                <tr>  
                { cards }
                </tr>     
           
        );
    }
}