'use strict';

export default class Minesweeper {
  // Difficulties:
  //  Beginner = 9x9 field with 10 mines
  //  Intermediate = 16x16 field with 40 mines
  //  Expert = 30 x 16 field with 99 mines
  static newGame(x, y, mineCount) {
    var minefield = [];

    // Create minefield matrix (with padding)
    for (var i = 0; i < x + 2; i++) {
      minefield[i] = [];
      for (var j = 0; j < y + 2; j++) {
        minefield[i][j] = 0;
      }
    }

    // Randomly lay mines within minefield
    var minesLaid = 0;
    while (minesLaid < mineCount) {
      var coordX = Math.floor(Math.random() * x + 1);
      var coordY = Math.floor(Math.random() * y + 1);
      if (minefield[coordX][coordY] === 0) {
        minefield[coordX][coordY] = '*';
        minesLaid++;
      }
    }

    // Add numbers to neighboring minefield cells
    for (var i = 1; i <= x; i++) {
      for (var j = 1; j <= y; j++) {
        for (var ii = (i - 1); ii <= (i + 1); ii++) {
          for (var jj = (j - 1); jj <= (j + 1); jj++) {
            if (minefield[i][j] !== '*' && minefield[ii][jj] === '*')
              minefield[i][j]++;
          }
        }
      }
    }

    // Remove padding
    minefield = minefield.map((row, rowIndex) => {
      row.shift();
      row.pop();
      return row;
    });

    minefield.shift();
    minefield.pop();

    // Convert individual cells to objects.
    return minefield.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        return {
          x: rowIndex,
          y: colIndex,
          value: col,
          isOpen: false,
          isFlagged: false,
          isEmpty: (col === 0),
          isMine: (col === '*')
        };
      });
    });
  }

  static flagCell(cells, x, y) {
    cells[x][y].isFlagged = !cells[x][y].isFlagged;
    return cells;
  }

  static revealCell(cells, x, y) {
    cells[x][y].isOpen    = true;
    cells[x][y].isFlagged = false;
    return cells;
  }

  static revealSiblings(cells, x, y) {
    if (cells[x]    === undefined) return cells;
    if (cells[x][y] === undefined) return cells;
    if (cells[x][y].isOpen)        return cells;

    cells[x][y].isOpen    = true;
    cells[x][y].isFlagged = false;

    if (cells[x][y].isEmpty) {
      for (var xx = (x - 1); xx <= (x + 1); xx++) {
        for (var yy = (y - 1); yy <= (y + 1); yy++) {
          cells = this.revealSiblings(cells, xx, yy);
        }
      }
    }

    return cells;
  }

  static revealMines(cells) {
    return cells.map((row) => {
      return row.map((cell) => {
        if (cell.isMine)
          cell.isOpen = true;
        return cell;
      })
    });
  }

  static countFlags(cells) {
    return cells.reduce((memo1, row) => {
      return memo1 + row.reduce((memo2, cell) => {
        return memo2 + (cell.isFlagged ? 1 : 0);
      }, 0);
    }, 0);
  }
}
