import React from 'react';
import { connect } from 'react-redux';
import { newGame } from '../actions';
import { getClock, getStatus, countFlags } from '../reducers';
import Difficulty from './Difficulty';
import Hud from './Hud';
import Minefield from './Minefield';
import '../styles/Minesweeper.css';

class Minesweeper extends React.Component {
  componentWillMount() {
    this.props.dispatch(newGame(0));
  }

  render() {
    return (
      <div className="minesweeper">
        <Hud clock={this.props.clock}
             status={this.props.status}
             mines={this.props.mines}
             flagged={this.props.flagged}
             difficulty={this.props.difficulty} />

        <Minefield cells={this.props.cells} />
        <Difficulty value={this.props.difficulty} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let cells   = state.get('cells'),
      status  = getStatus(cells),
      clock   = getClock(status),
      flagged = countFlags(cells);

  return state.merge({ state, status, clock, flagged }).toObject();
};

Minesweeper = connect(mapStateToProps)(Minesweeper);
export default Minesweeper;
