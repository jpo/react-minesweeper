import MineSweeperCell from './MineSweeperCell';

/**
 * Represents the MineSweeper game. This class is responsible for managing the
 * game state and the game logic.
 * @class MineSweeper
 * @property {MineSweeperCell[][]} cells The cells in the minefield.
 * @property {string} status The current status of the game.
 * @property {number} difficulty The current difficulty of the game.
 * @property {number} rows The number of rows in the minefield.
 * @property {number} cols The number of columns in the minefield.
 * @property {number} mines The number of mines in the minefield.
 * @property {number} startTime The start time of the game in milliseconds.
 * @property {number} stopTime The stop time of the game in milliseconds.
 * @property {boolean} isNewGame Indicates if the game is a new game.
 * @property {boolean} isPlaying Indicates if the game is in progress.
 * @property {boolean} isWinner Indicates if the game is won.
 * @property {boolean} isLoser Indicates if the game is lost.
 * @property {boolean} isGameOver Indicates if the game is over.
 * @property {number} elapsedTime The elapsed time in seconds.
 * @property {number} remainingMines The number of remaining flags.
 */
class MineSweeper {
  static DIFFICULTY = [
    { rows: 9, cols: 9, mines: 10 },
    { rows: 16, cols: 16, mines: 40 },
    { rows: 16, cols: 30, mines: 99 },
  ];

  static STATUS = {
    NEW: 'new',
    PLAYING: 'playing',
    WON: 'won',
    LOST: 'lost',
  };

  constructor(options) {
    if ('difficulty' in options) {
      const difficulty = MineSweeper.DIFFICULTY[options.difficulty];
      this.rows = difficulty.rows;
      this.cols = difficulty.cols;
      this.mines = difficulty.mines;
    } else {
      this.rows = options.rows;
      this.cols = options.cols;
      this.mines = options.mines;
    }

    this.status = MineSweeper.STATUS.NEW;
    this.remainingCells = this.rows * this.cols - this.mines;
    this.remainingFlags = this.mines;
    this.startTime = null;
    this.stopTime = null;
    this.cells = this._createCells(this.rows, this.cols, this.mines);
  }

  /**
   * Indicates if the game is a new game.
   * @returns {boolean} True if the game is a new game, false otherwise.
   */
  get isNewGame() {
    return this.status === MineSweeper.STATUS.NEW;
  }

  /**
   * Indicates if the game is in progress.
   * @returns {boolean} True if the game is in progress, false otherwise.
   */
  get isPlaying() {
    return this.status === MineSweeper.STATUS.PLAYING;
  }

  /**
   * Indicates if the game is won.
   * @returns {boolean} True if the game is won, false otherwise.
   */
  get isWinner() {
    return this.status === MineSweeper.STATUS.WON;
  }

  /**
   * Indicates if the game is lost.
   * @returns {boolean} True if the game is lost, false otherwise.
   */
  get isLoser() {
    return this.status === MineSweeper.STATUS.LOST;
  }

  /**
   * Indicates if the game is over.
   * @returns {boolean} True if the game is over, false otherwise.
   */
  get isGameOver() {
    return this.isWinner || this.isLoser;
  }

  /**
   * Gets the elapsed time in seconds.
   * @returns {number} The elapsed time in seconds.
   */
  get elapsedTime() {
    let elapsed = 0;

    if (this.isNewGame) {
      return elapsed;
    }

    if (this.isGameOver) {
      elapsed = (this.stopTime - this.startTime) / 1000;
      return Math.floor(elapsed);
    }

    elapsed = (Date.now() - this.startTime) / 1000;
    return Math.floor(elapsed);
  }

  /**
   * Starts a new game.
   * @throws {Error} If the game is already in progress.
   */
  startGame() {
    if (this.isNewGame) {
      this.status = MineSweeper.STATUS.PLAYING;
      this.startTime = Date.now();
      this.stopTime = null;
    }
  }

  /**
   * Stops the game.
   */
  stopGame(status) {
    if (this.isNewGame || this.isGameOver) {
      return;
    }

    if (status === MineSweeper.STATUS.WON || status === MineSweeper.STATUS.LOST) {
      this.status = status;
      this.stopTime = Date.now();
    }
  }

  /**
   * Reveals the specified cell.
   * @param {number} row - The row of the cell to reveal.
   * @param {number} col - The column of the cell to reveal.
   */
  revealCell(row, col) {
    if (this.isNewGame) {
      this.startGame();
    }

    if (!this.isPlaying) {
      return;
    }

    const cell = this.cells[row][col];

    if (cell.flagged || cell.revealed) {
      return;
    }

    cell.reveal();

    if (cell.isMine) {
      this.stopGame(MineSweeper.STATUS.LOST);
      return;
    }

    this.remainingCells--;

    if (cell.isEmpty) {
      this._revealAdjacentCells(row, col);
    }

    if (this.remainingCells === 0) {
      this.stopGame(MineSweeper.STATUS.WON);
    }
  }

  /**
   * Toggles the flag on the specified cell.
   * @param {number} row - The row of the cell to toggle.
   * @param {number} col - The column of the cell to toggle.
   */
  toggleFlag(row, col) {
    const cell = this.cells[row][col];

    if (cell.flagged) {
      this.unflagCell(row, col);
    } else {
      this.flagCell(row, col);
    }
  }
  
  /**
   * Flags the specified cell.
   * @param {number} row - The row of the cell to flag.
   * @param {number} col - The column of the cell to flag.
   * @returns {void}
   */
  flagCell(row, col) {
    if (!this.isNewGame && !this.isPlaying) {
      return;
    }

    if (this.isNewGame) {
      this.startGame();
    }

    const cell = this.cells[row][col];

    if (!cell.flagged && !cell.revealed && this.remainingFlags > 0)  {
      cell.flag();
      this.remainingFlags--;
    }
  }

  /**
   * Unflags the specified cell.
   * @param {number} row - The row of the cell to unflag.
   * @param {number} col - The column of the cell to unflag.
   * @returns {void} 
   */
  unflagCell(row, col) {
    if (!this.isNewGame && !this.isPlaying) {
      return;
    }

    if (this.isNewGame) {
      this.startGame();
    }

    const cell = this.cells[row][col];

    if (cell.flagged && !cell.revealed && this.remainingFlags < this.mines)  {
      cell.unflag();
      this.remainingFlags++;
    }
  }

  /**
   * Create a 2D minefield with the specified number of rows and columns where
   * each cell has a value of 0, '*', or a number (1-9), where:
   * 
   * - 0: No adjacent mines (empty cell)
   * - *: A mine
   * - 1-9: The number of adjacent mines
   * 
   * @param {number} rows - The number of rows in the minefield.
   * @param {number} cols - The number of columns in the minefield.
   * @param {number} mines - The number of mines in the minefield.
   * @returns {MineSweeperCell[][]} - The minefield.
   */
  _createCells(rows, cols, mines) {
    const minefield = [];

    // Create the minefield with default cells and no mines.
    for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < cols; j++) {
        const cell = new MineSweeperCell(i, j);
        row.push(cell);
      }

      minefield.push(row);
    }

    // Place mines at random locations.
    let mineCount = 0;
    let x, y;

    while (mineCount < mines) {
      x = Math.floor(Math.random() * cols);
      y = Math.floor(Math.random() * rows);

      if (!minefield[y][x].isMine) {
        minefield[y][x].value = '*';
        mineCount++;
      }
    }

    // Calculate the number of adjacent mines for each cell.
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!minefield[i][j].isMine) {
          const count = this._countAdjacentMines(minefield, i, j);
          minefield[i][j].value = count;
        }
      }
    }

    return minefield;
  }

  /**
   * Count the number of adjacent mines for the specified cell. 
   * @param {MineSweeperCell[][]} minefield - The minefield.
   * @param {number} row - The row of the cell.
   * @param {number} col - The column of the cell.
   * @returns {number} - The number of adjacent mines.
   */
  _countAdjacentMines(minefield, row, col) {
    let count = 0;

    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
          if (minefield[i][j].isMine) {
            count++;
          }
        }
      }
    }

    return count;
  }

  /**
   * Get the adjacent cells to the specified cell.
   * @param {number} row - The row of the cell.
   * @param {number} col - The column of the cell.
   * @returns {MineSweeperCell[]} - The adjacent cells.
   */
  _getAdjacentCells(row, col) {
    const adjacentCells = [];
    
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
          adjacentCells.push(this.cells[r][c]);
        }
      }
    }

    return adjacentCells;
  }

  /**
   * Recursively reveals the cells adjacent to the specified cell if the cell
   * is empty.
   * @param {number} row - The row of the cell.
   * @param {number} col - The column of the cell.
   * @returns {void}
   */
  _revealAdjacentCells(row, col) {
    const adjacentCells = this._getAdjacentCells(row, col);

    for (const cell of adjacentCells) {
      if (cell.hidden) {
        cell.reveal();
        this.remainingCells--;
        if (cell.isEmpty) {
          this._revealAdjacentCells(cell.row, cell.col);
        }
      }
    }
  }
}

export default MineSweeper;
