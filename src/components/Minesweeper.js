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
        <Minefield rows={this.props.rows} cols={this.props.cols} cells={this.props.cells} />
        <Difficulty value={this.props.difficulty} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    difficulty: state.get('difficulty'),
    cells:      state.get('cells'),
    rows:       state.get('rows'),
    cols:       state.get('cols')
  };
};

Minesweeper = connect(mapStateToProps)(Minesweeper);
export default Minesweeper;
