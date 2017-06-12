import React from 'react';
import {connect} from 'react-redux';
import {newGame} from '../actions';
import Difficulty from './Difficulty';
import Hud from './Hud';
import Minefield from './Minefield';
import '../styles/Minesweeper.css';

class Minesweeper extends React.Component {
  componentWillMount() {
    this.props.dispatch(newGame(0));
  }

  render() {
    let {difficulty, rows, cols, cells, stats, status} = this.props;
    return (
      <div className="minesweeper">
        <Hud status={status} stats={stats} />
        <Minefield rows={rows} cols={cols} cells={cells} />
        <Difficulty value={difficulty} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    difficulty: state.get('difficulty'),
    rows:       state.get('rows'),
    cols:       state.get('cols'),
    cells:      state.get('cells'),
    stats:      state.get('stats'),
    status:     state.get('status')
  };
};

Minesweeper = connect(mapStateToProps)(Minesweeper);
export default Minesweeper;
