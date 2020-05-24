import React from "react";
import PropTypes from "prop-types";
import "./board.css";
// React component of TicTacToeBoard
export default class TicTacToeBoard extends React.Component {
  // type checking
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool
  };
  // clicking a cell
  onClick = id => {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
      
    }
  };
  // if cell is 'active' or untouched
  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }
// render component
  render() {
    // make a table of m*n with unique cell ids
    let tbody = [];
    for (let i = 0; i < this.props.G.m; i++) {
      let cells = [];
      for (let j = 0; j < this.props.G.n; j++) {
        const id = this.props.G.n * i + j;
        cells.push(
          <td
            key={id}
            className={this.isActive(id) ? "active" : ""}
            onClick={() => this.onClick(id)}
          >
            {this.props.G.cells[id]}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }
    // winner
    let winner = null;
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}
