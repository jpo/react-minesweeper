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

    this.model = MinesweeperModel;

    this.difficulties = [
      {rows:  9, cols:  9, mines: 10},
      {rows: 16, cols: 16, mines: 40},
      {rows: 16, cols: 30, mines: 99}
    ];

    this.status = {
      init:     'init',
      playing:  'playing',
      gameover: 'gameover'
    };

    this.clock = {
      on:     'on',
      off:    'off',
      paused: 'paused'
    };
  }

  resetGame() {
    this.newGame(this.state.difficulty);
  }

  // beginner:0, intermediate:1, expert:2
  newGame(difficulty) {
    var { rows, cols, mines } = this.difficulties[difficulty];

    this.setState({
      status:     this.status.init,
      clock:      this.clock.off,
      cells:      this.model.newGame(rows, cols, mines),
      difficulty: difficulty,
      rows:       rows,
      cols:       cols,
      mines:      mines,
      flagged:    0
    });
  }

  isGameOver() {
    return this.state.status === this.status.gameover;
  }

  flagCell(x, y) {
    if (this.isGameOver())
      return;

    this.setState({
      cells:   this.model.flagCell(this.state.cells, x, y),
      flagged: this.model.countFlags(this.state.cells),
      clock:   this.clock.on,
      status:  this.clock.playing
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
        cells:   this.model.revealMines(cells),
        flagged: this.model.countFlags(this.state.cells),
        clock:   this.clock.paused,
        status:  this.status.gameover
      });
    }
    else if (cell.isEmpty) {
      this.setState({
        cells:   this.model.revealSiblings(cells, x, y),
        flagged: this.model.countFlags(this.state.cells),
        clock:   this.clock.on,
        status:  this.status.playing
      });
    }
    else {
      this.setState({
        cells:   this.model.revealCell(cells, x, y),
        flagged: this.model.countFlags(this.state.cells),
        clock:   this.clock.on,
        status:  this.status.playing
      });
    }
  }

  minesRemaining() {
    return this.state.mines - this.state.flagged;
  }

  componentWillMount() {
    this.newGame(0);
  }

  render() {
    return (
      <div className="minesweeper">
        <GameStatus clockMode={this.state.clock}
                    status={this.state.status}
                    mines={this.minesRemaining()}
                    resetGame={this.resetGame.bind(this)} />

        <Minefield cells={this.state.cells}
                   openCell={this.openCell.bind(this)}
                   flagCell={this.flagCell.bind(this)} />

        <Difficulty difficulty={this.state.difficulty}
                    beginner={this.newGame.bind(this, 0)}
                    intermediate={this.newGame.bind(this, 1)}
                    expert={this.newGame.bind(this, 2)} />
      </div>
    );
  }
}
