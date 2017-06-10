import React from 'react';
import {connect} from 'react-redux';
import {newGame} from '../actions';
import {getClock, getStatus, countFlags} from '../reducers';
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
        <Hud />
        <Minefield cells={this.props.cells} />
        <Difficulty value={this.props.difficulty} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let cells = state.get('cells');
  return state.merge({ cells }).toObject();
};

Minesweeper = connect(mapStateToProps)(Minesweeper);
export default Minesweeper;
