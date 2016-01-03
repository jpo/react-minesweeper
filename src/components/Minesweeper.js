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

  componentWillMount() {
    this.onNewGame(0);
  }

  isGameOver() {
    return this.state.status === this.status.gameover;
  }

  getRemainingMineCount() {
    return this.state.mines - this.state.flagged;
  }

  // beginner:0, intermediate:1, expert:2
  onNewGame(difficulty) {
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

  onResetGame() {
    this.onNewGame(this.state.difficulty);
  }

  onFlagCell(x, y) {
    if (this.isGameOver())
      return;

    this.setState({
      cells:   this.model.flagCell(this.state.cells, x, y),
      flagged: this.model.countFlags(this.state.cells),
      clock:   this.clock.on,
      status:  this.status.playing
    });
  }

  onOpenCell(x, y) {
    if (this.isGameOver())
      return;

    var cells = this.state.cells,
        cell  = cells[x][y];

    if (cell.isOpen)
      return;

    if (cell.isMine) {
      this.setState({
        cells:   this.model.openMines(cells),
        flagged: this.model.countFlags(cells),
        clock:   this.clock.paused,
        status:  this.status.gameover
      });
    }
    else if (cell.isEmpty) {
      this.setState({
        cells:   this.model.openSiblings(cells, x, y),
        flagged: this.model.countFlags(cells),
        clock:   this.clock.on,
        status:  this.status.playing
      });
    }
    else {
      this.setState({
        cells:   this.model.openCell(cells, x, y),
        flagged: this.model.countFlags(cells),
        clock:   this.clock.on,
        status:  this.status.playing
      });
    }
  }

  render() {
    return (
      <div className="minesweeper">
        <GameStatus clockMode={this.state.clock}
                    status={this.state.status}
                    mines={this.getRemainingMineCount()}
                    onResetGame={this.onResetGame.bind(this)} />

        <Minefield cells={this.state.cells}
                   onOpenCell={this.onOpenCell.bind(this)}
                   onFlagCell={this.onFlagCell.bind(this)} />

        <Difficulty difficulty={this.state.difficulty}
                    onBeginner={this.onNewGame.bind(this, 0)}
                    onIntermediate={this.onNewGame.bind(this, 1)}
                    onExpert={this.onNewGame.bind(this, 2)} />
      </div>
    );
  }
}
