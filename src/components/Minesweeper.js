'use strict';

import React from 'react';
import GameStatus from './GameStatus'
import Minefield from './Minefield'
import Difficulty from './Difficulty'
import MinesweeperModel from '../models/Minesweeper'
import MinesweeperStore from '../stores/MinesweeperStore'

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

    if (this.isClockRunning())
      this.stopClock();

    this.setState(settings);
  }

  getGameSettings(difficulty) {
    var settings = {};

    switch (difficulty) {
      case 1:
        settings = { rows: 9, cols: 9, mines: 10 };
        break;
      case 2:
        settings = { rows: 16, cols: 16, mines: 40 };
        break;
      case 3:
        settings = { rows: 16, cols: 30, mines: 99 };
        break;
    }

    return {
      status: 'init',
      cells: MinesweeperModel.newGame(settings.rows, settings.cols, settings.mines),
      difficulty: difficulty,
      rows: settings.rows,
      cols: settings.cols,
      mines: settings.mines,
      time: 0,
      clockId: 0
    }
  }

  /*
  createMinefield(rows, cols, mines) {
    var minefield = MinesweeperStore.generateMinefield(rows, cols, mines);

    return minefield.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        return {
          x: rowIndex,
          y: colIndex,
          value: col,
          isOpen: false,
          isFlagged: false,
          isEmpty: (col === ' '),
          isMine: (col === '*')
        };
      });
    });
  }
  */

  isNewGame() {
    return this.state.status && this.state.status === 'init';
  }

  isGameOver() {
    return this.state.status && this.state.status === 'gameover';
  }

  isWinner(cells) {
    return cells.every((row) => {
      return row.every((cell) => {
        return (!cell.isMine && cell.isOpen) || (cell.isMine && !cell.isOpen);
      });
    });
  }

  isLoser(cells) {
    return cells.some((row) => {
      return row.some((cell) => {
        return cell.isMine && cell.isOpen;
      });
    });
  }

  startClock() {
    var clockId = setInterval(this.clockTick.bind(this), 1000);
    this.setState({ time: 0, clockId: clockId, status: 'playing' });
  }

  stopClock() {
    clearInterval(this.state.clockId);
    this.setState({ clockId: 0, status: 'gameover' });
  }

  clockTick() {
    this.setState({ time: ++this.state.time });
  }

  isClockRunning() {
    return this.state.clockId && this.state.clockId > 0;
  }

  flagCell(x, y) {
    if (this.isGameOver())
      return;

    if (!this.isClockRunning())
      this.startClock();

    var cells = this.state.cells;
    cells[x][y].isFlagged = !cells[x][y].isFlagged;
    this.setState({ cells: cells });
  }

  openCell(x, y) {
    if (this.isGameOver())
      return;

    if (!this.isClockRunning())
      this.startClock();

    var cells = this.state.cells,
        cell  = cells[x][y];

    if (cell.isOpen)
      return;

    if (cell.isMine) {
      this.setState({ cells: this.revealMines(cells) });
      this.stopClock();
    }
    else if (cell.isEmpty) {
      this.setState({ cells: this.revealSiblings(cells, x, y) });
    }
    else {
      this.setState({ cells: this.revealCell(cells, x, y) });
    }
  }

  revealCell(cells, x, y) {
    cells[x][y].isOpen    = true;
    cells[x][y].isFlagged = false;
    return cells;
  }

  revealSiblings(cells, x, y) {
    if (cells[x]    === undefined) return cells;
    if (cells[x][y] === undefined) return cells;
    if (cells[x][y].isOpen)        return cells;

    cells[x][y].isOpen    = true;
    cells[x][y].isFlagged = false;

    if (cells[x][y].isEmpty) {
      cells = this.revealSiblings(cells, x - 1, y - 1);
      cells = this.revealSiblings(cells, x - 1, y);
      cells = this.revealSiblings(cells, x - 1, y + 1);
      cells = this.revealSiblings(cells, x + 1, y);
      cells = this.revealSiblings(cells, x, y - 1);
      cells = this.revealSiblings(cells, x, y + 1);
      cells = this.revealSiblings(cells, x + 1, y - 1);
      cells = this.revealSiblings(cells, x + 1, y + 1);
    }

    return cells;
  }

  revealMines(cells) {
    return cells.map((row) => {
      return row.map((cell) => {
        if (cell.isMine)
          cell.isOpen = true;
        return cell;
      })
    });
  }

  countFlags() {
    return this.state.cells.reduce((memo1, row) => {
      return memo1 + row.reduce((memo2, cell) => {
        return memo2 + (cell.isFlagged ? 1 : 0);
      }, 0);
    }, 0);
  }

  render() {
    return (
      <div className="minesweeper">
        <GameStatus time={this.state.time}
                    status={this.state.status}
                    mines={this.state.mines - this.countFlags()}
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
