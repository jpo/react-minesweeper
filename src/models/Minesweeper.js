'use strict';

/**
 * Model responsible for generating and manipulating the state of Minesweeper
 * games.
 */
export default class Minesweeper {
  /**
   * Generates a two-dimensional array that represents a Minesweeper mine field.
   *
   * @param  {Number}  x
   * The number of cells to create within the x-axis.
   *
   * @param  {Number}  y
   * The number of cells to create within the y-axis.
   *
   * @param  {Number}  mineCount
   * The number of mines to randomly place throughout the mine field.
   *
   * @return {Array}
   * A two-dimensional array representing a mine field.
   */
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

  /**
   * Given a two-dimensional array representing a mine field, marks the cell
   * at the given x,y coordinate as flagged.
   *
   * @param  {Array} cells
   * A two-dimensional array representing a mine field's current state.

   * @param  {Number}  x
   * The number of cells to create within the x-axis.
   *
   * @param  {Number}  y
   * The number of cells to create within the y-axis.
   *
   * @return {Array}
   * A two-dimensional array representing the updated state of the given mine field.
   */
  static flagCell(cells, x, y) {
    cells[x][y].isFlagged = !cells[x][y].isFlagged;
    return cells;
  }

  /**
   * Given a two-dimensional array representing a mine field, marks the cell
   * at the given x,y coordinate as open. If the cell was previously marked as
   * flagged, the flag will be removed.
   *
   * @param  {Array} cells
   * A two-dimensional array representing a mine field's current state.

   * @param  {Number}  x
   * The number of cells to create within the x-axis.
   *
   * @param  {Number}  y
   * The number of cells to create within the y-axis.
   *
   * @return {Array}
   * A two-dimensional array representing the updated state of the given mine field.
   */
  static openCell(cells, x, y) {
    cells[x][y].isOpen    = true;
    cells[x][y].isFlagged = false;
    return cells;
  }

  /**
   * Given a two-dimensional array representing a mine field, marks the cell
   * at the given x,y coordinate as open. Then, recursively searches through
   * sibling cells that do not contain a mine and opens them as well. This
   * method is chiefly used to create a "cascade" effect when opening an empty
   * cell.
   *
   * @param  {Array} cells
   * A two-dimensional array representing a mine field's current state.

   * @param  {Number}  x
   * The number of cells to create within the x-axis.
   *
   * @param  {Number}  y
   * The number of cells to create within the y-axis.
   *
   * @return {Array}
   * A two-dimensional array representing the updated state of the given mine field.
   */
  static openSiblings(cells, x, y) {
    if (cells[x]    === undefined) return cells;
    if (cells[x][y] === undefined) return cells;
    if (cells[x][y].isOpen)        return cells;

    cells[x][y].isOpen    = true;
    cells[x][y].isFlagged = false;

    if (cells[x][y].isEmpty) {
      for (var xx = (x - 1); xx <= (x + 1); xx++) {
        for (var yy = (y - 1); yy <= (y + 1); yy++) {
          cells = this.openSiblings(cells, xx, yy);
        }
      }
    }

    return cells;
  }

  /**
   * Given a two-dimensional array representing a mine field, marks all of the
   * mines as open. This method is chiefly used to reveal all mines after a
   * playing has lost the game.
   *
   * @param  {Array} cells
   * A two-dimensional array representing a mine field's current state.

   * @return {Array}
   * A two-dimensional array representing the updated state of the given mine field.
   */
  static openMines(cells) {
    return cells.map((row) => {
      return row.map((cell) => {
        if (cell.isMine)
          cell.isOpen = true;
        return cell;
      })
    });
  }

  /**
   * Given a two-dimensional array representing a mine field, returns the number
   * of cells that have been marked as flagged.
   *
   * @param  {Array} cells
   * A two-dimensional array representing a mine field's current state.

   * @return {Number}
   * A number representing the number of cells that have been flagged.
   */
  static countFlags(cells) {
    return cells.reduce((memo1, row) => {
      return memo1 + row.reduce((memo2, cell) => {
        return memo2 + (cell.isFlagged ? 1 : 0);
      }, 0);
    }, 0);
  }

  /**
   * Given a two-dimensional array representing a mine field, returns a boolean
   * indicating whether or not the player has won the game. A game is considered
   * to be won when all cells that do not contain mines have been opened.
   *
   * @param  {Array} cells
   * A two-dimensional array representing a mine field's current state.

   * @return {Boolean}
   * A boolean representing whether or not the player has won the game.
   */
  static isWinner(cells) {
    return cells.every((row) => {
      return row.every((cell) => {
        return (!cell.isMine && cell.isOpen) || (cell.isMine && !cell.isOpen);
      });
    });
  }

  /**
   * Given a two-dimensional array representing a mine field, returns a boolean
   * indicating whether or not the player has lost the game. A game is considered
   * to be lost when any cell containing a mine has been opened.
   *
   * @param  {Array} cells
   * A two-dimensional array representing a mine field's current state.

   * @return {Boolean}
   * A boolean representing whether or not the player has lost the game.
   */
  static isLoser(cells) {
    return cells.some((row) => {
      return row.some((cell) => {
        return cell.isMine && cell.isOpen;
      });
    });
  }
}
