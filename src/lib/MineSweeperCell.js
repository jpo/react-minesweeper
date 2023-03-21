
/**
 * Represents a cell in a Mine Sweeper game.
 * @class MineSweeperCell
 * @property {number} row - The row of the cell.
 * @property {number} col - The column of the cell.
 * @property {boolean} revealed - A boolean indicating whether the cell is
 * revealed.
 * @property {boolean} flagged - A boolean indicating whether the cell is
 * flagged.
 * @property {string} value - The value of the cell.
 * @property {boolean} isMine - A boolean indicating whether the cell is a mine.
 * @property {boolean} isEmpty - A boolean indicating whether the cell is empty.
 * @property {boolean} hidden - A boolean indicating whether the cell is hidden.
 */
class MineSweeperCell {
  #value;

  constructor(row, col, value=0) {
    this.row = row;
    this.col = col;
    this.revealed = false;
    this.flagged = false;
    this._value = value;
  }

  /**
   * Indicates whether the cell is a mine.
   * @returns {boolean} - A boolean indicating whether the cell is a mine.
   */
  get isMine() {
    return this._value === '*';
  }

  /**
   * Indicates whether the cell is empty.
   * @returns {boolean} - A boolean indicating whether the cell is empty.
   */
  get isEmpty() {
    return this._value === 0;
  }

  /**
   * Indicates whether the cell is hidden.
   * @returns {boolean} - A boolean indicating whether the cell is hidden.
   */
  get hidden() {
    return !this.revealed && !this.flagged;
  }

  /**
   * Gets the value of the cell. The value may be different depending on the
   * state of the cell. Possible values are:
   * 
   * When the cell is hidden:
   * - The value is ''.
   * 
   * When the cell is flagged:
   * - The value is 'F'.
   * 
   * When the cell is revealed:
   * - The value is '' if the cell is empty.
   * - The value is '*' if the cell is a mine.
   * - Otherwise, the value is the number of adjacent mines.
   * 
   * @returns {string} - The value of the cell.
   */
  get value() {
    if (this.revealed) {
      if (this.isMine) {
        return '*';
      } else if (this.isEmpty) {
        return '';
      } else {
        return this._value;
      }
    } else if (this.flagged) {
      return 'F';
    } else {
      return '';
    }
  }

  /**
   * Sets the value of the cell.
   * @param {string} value - The value of the cell.
   */
  set value(value) {
    this._value = value;
  }

  /**
   * Reveals the cell.
   */
  reveal() {
    this.revealed = true;
  }

  /**
   * Flags the cell.
   */
  flag() {
    this.flagged = true;
  }

  /**
   * Unflags the cell.
   */
  unflag() {
    this.flagged = false;
  }
}

export default MineSweeperCell;
