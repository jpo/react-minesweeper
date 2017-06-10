import {List, Map, Repeat} from 'immutable';

const initialState = Map({
  difficulty: 0,
  cells: List()
});

export const gameState = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_GAME':
      return newGame(initialState, action);
    case 'RESET_GAME':
      return newGame(state, action);
    case 'OPEN_CELL':
      return openCell(state, action);
    case 'OPEN_EMPTY':
      return openEmpty(state, action);
    case 'OPEN_FLAG':
      return openFlag(state, action);
    case 'OPEN_MINE':
      return openMine(state, action);
    case 'FLAG_CELL':
      return flagCell(state, action);
    default:
      return state;
  }
};

const newGame = (state, action) => {
  let { difficulty } = action;
  let { rows, cols, mines } = getDifficulty(difficulty);
  let cells = createCells(rows, cols, mines);
  return state.merge({ difficulty, mines, cells });
};

const openCell = (state, {x,y}) => {
  return state.mergeIn(['cells', x, y], {'isOpen': true, 'isFlagged': false});
};

const openEmpty = (state, {x,y}) => {
  const openSiblings = (cells, x, y) => {
    if (x < 0 || y < 0 || cells.getIn([x, y, 'isOpen'], true))
      return cells;

    let nextCells = cells.setIn([x, y, 'isOpen'], true);
    if (nextCells.getIn([x, y, 'isEmpty'])) {
      for (let xx = (x - 1); xx <= (x + 1); xx++) {
        for (let yy = (y - 1); yy <= (y + 1); yy++) {
          nextCells = openSiblings(nextCells, xx, yy);
        }
      }
    }

    return nextCells;
  };

  return state.update('cells', cells => openSiblings(cells, x, y));
};

const openFlag = (state, {x,y}) => {
  return state.mergeIn(['cells', x, y], {'isOpen': true, 'isFlagged': false});
};

const openMine = (state, {x,y}) => {
  let cells = state.get('cells');

  cells = cells.map((row) => {
    return row.map((cell) => {
      if (cell.get('isMine'))
        return cell.set('isOpen', true);
      return cell;
    });
  });

  return state.set('cells', cells);
};

const flagCell = (state, {x,y}) => {
  return state.updateIn(['cells', x , y, 'isFlagged'], val => !val);
};

const createCells = (rows, cols, mines) => {
  // Create minefield matrix (with padding)
  let cells = List(Repeat(List(Repeat(0, cols + 2)), rows + 2));

  // Randomly lay mines within minefield
  let laid = 0;
  while (laid < mines) {
    let x = Math.floor(Math.random() * rows + 1);
    let y = Math.floor(Math.random() * cols + 1);
    if (cells.getIn([x,y]) === 0) {
      cells = cells.setIn([x,y], '*');
      laid++;
    }
  }

  // Add numbers to neighboring minefield cells
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      for (let ii = (i - 1); ii <= (i + 1); ii++) {
        for (let jj = (j - 1); jj <= (j + 1); jj++) {
          if (cells.getIn([i,j]) !== '*' && cells.getIn([ii,jj]) === '*')
            cells = cells.updateIn([i,j], (val) => val + 1);
        }
      }
    }
  }

  // Remove padding
  cells = cells.map((r) => r.slice(1, -1)).slice(1, -1);

  // Convert individual cells to objects.
  return cells.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      return Map({
        x: rowIndex,
        y: colIndex,
        value: col,
        isOpen: false,
        isFlagged: false,
        isEmpty: (col === 0),
        isMine: (col === '*')
      });
    });
  });
};

const getDifficulty = (difficulty) => {
  switch (difficulty) {
    case 0:
      return { rows: 9, cols: 9, mines: 10 };
    case 1:
      return { rows: 16, cols: 16, mines: 40 };
    case 2:
      return { rows: 16, cols: 30, mines: 99 };
    default:
      return { rows: 9, cols: 9, mines: 10 };
  }
};
