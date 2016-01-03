'use strict';

import React from 'react';
import GameStatus from './GameStatus'
import Minefield from './Minefield'
import Difficulty from './Difficulty'
import MinesweeperModel from '../models/Minesweeper'

require('styles//Minesweeper.css');

export default class Minesweeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getGameSettings(1);
  }

  resetGame() {
    this.newGame(this.state.difficulty);
  }

  // 1 = beginner, 2 = intermediate, 3 = expert
  newGame(difficulty) {
    var settings = this.getGameSettings(difficulty);
    this.setState(settings);
  }

  getGameSettings(difficulty) {
    var config = (difficulty === 1) ? {rows:  9, cols:  9, mines: 10} :
                 (difficulty === 2) ? {rows: 16, cols: 16, mines: 40} :
                 (difficulty === 3) ? {rows: 16, cols: 30, mines: 99} : {};

    return {
      status: 'init',
      cells: MinesweeperModel.newGame(config.rows, config.cols, config.mines),
      difficulty: difficulty,
      rows: config.rows,
      cols: config.cols,
      mines: config.mines
    }
  }

  isNewGame() {
    return this.state.status && this.state.status === 'init';
  }

  isGameOver() {
    return this.state.status && this.state.status === 'gameover';
  }

  flagCell(x, y) {
    if (this.isGameOver())
      return;

    this.setState({
      cells:  MinesweeperModel.flagCell(this.state.cells, x, y),
      status: 'playing'
    });
  }

  openCell(x, y) {
    if (this.isGameOver())
      return;

    var cells = this.state.cells,
        cell  = cells[x][y];

    if (cell.isOpen)
      return;

    if (cell.isMine) {
      this.setState({
        cells:  MinesweeperModel.revealMines(cells),
        status: 'gameover'
      });
    }
    else if (cell.isEmpty) {
      this.setState({
        cells:  MinesweeperModel.revealSiblings(cells, x, y),
        status: 'playing'
      });
    }
    else {
      this.setState({
        cells:  MinesweeperModel.revealCell(cells, x, y),
        status: 'playing'
      });
    }
  }

  minesRemaining() {
    return this.state.mines - MinesweeperModel.countFlags(this.state.cells);
  }

  clockMode(status) {
    switch (status) {
      case 'init':     return 'reset';
      case 'playing':  return 'on';
      case 'gameover': return 'off';
      default:         return 'off';
    }
  }

  render() {
    return (
      <div className="minesweeper">
        <GameStatus clockMode={this.clockMode(this.state.status)}
                    status={this.state.status}
                    mines={this.minesRemaining()}
                    resetGame={this.resetGame.bind(this)} />

        <Minefield cells={this.state.cells}
                   openCell={this.openCell.bind(this)}
                   flagCell={this.flagCell.bind(this)} />

        <Difficulty difficulty={this.state.difficulty}
                    beginner={this.newGame.bind(this, 1)}
                    intermediate={this.newGame.bind(this, 2)}
                    expert={this.newGame.bind(this, 3)} />
      </div>
    );
  }
}
