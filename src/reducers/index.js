import { List, Map } from 'immutable';

const initialState = Map({
  status: 'init',
  clock: 'off',
  difficulty: 0,
  cells: List()
});

export const gameState = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_GAME':
      return newGame(initialState, action);
    case 'OPEN_CELL':
    case 'FLAG_CELL':
      return playGame(state, action);
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

const playGame = (state, action) => {
  let cells   = state.get('cells'),
      {x,y}   = action;

  if (isGameOver(cells) || isWinner(cells))
    return state;

  switch(action.type) {
    case 'OPEN_CELL':
      return state.merge({ cells: checkCell(cells, x, y) });
    case 'FLAG_CELL':
      return state.merge({ cells: flagCell(cells, x, y) });
    default:
      return state;
  }
};

export const getStatus = (cells) => {
  if (isGameOver(cells)) return 'gameover';
  if (isWinner(cells))   return 'winner';
  if (isPlaying(cells))  return 'playing';

  return 'init';
};

export const getClock = (status = 'init') => {
  switch (status) {
    case 'playing':  return 'on';
    case 'winner':
    case 'gameover': return 'paused';
    case 'init':     
    default:         return 'off';
  }
};

export const countFlags = (cells) => {
  return cells.reduce((memo1, row) => {
    return memo1 + row.reduce((memo2, cell) => {
      return memo2 + (cell.isFlagged ? 1 : 0);
    }, 0);
  }, 0);
};

const createCells = (rows, cols, mines) => {
  let cells = List();

  // Create minefield matrix (with padding)
  for (let i = 0; i < rows + 2; i++) {
    cells = cells.set(i, List());
    for (let j = 0; j < cols + 2; j++) {
      cells = cells.setIn([i, j], 0);
    }
  }

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

const checkCell = (cells, x, y) => {
  let cell = cells.getIn([x,y]);

  if (cell.get('isOpen'))
    return cells;

  if (cell.get('isMine'))
    return openMines(cells, x, y);

  if (cell.get('isEmpty'))
    return openSiblings(cells, x, y);

  return openCell(cells, x, y);
};

const openMines = (cells) => {
  return cells.map((row) => {
    return row.map((cell) => {
      if (cell.get('isMine'))
        return cell.set('isOpen', true);
      return cell;
    });
  });
};

const openSiblings = (cells, x, y) => {
  if (x < 0 || cells.get(x)       === undefined) return cells;
  if (y < 0 || cells.getIn([x,y]) === undefined) return cells;
  if (cells.getIn([x, y, 'isOpen']))             return cells;

  let nextCells = openCell(cells, x, y);
  if (nextCells.getIn([x, y, 'isEmpty'])) {
    for (let xx = (x - 1); xx <= (x + 1); xx++) {
      for (let yy = (y - 1); yy <= (y + 1); yy++) {
        nextCells = openSiblings(nextCells, xx, yy);
      }
    }
  }

  return nextCells;
};

const openCell = (cells, x, y) => {
  return cells.map((row) => {
    return row.map((cell) => {
      if (cell.get('x') === x && cell.get('y') === y)
        return cell.merge({ isOpen: true, isFlagged: false });
      else
        return cell;
    });
  });
};

const flagCell = (cells, x, y) => {
  return cells.map((row) => {
    return row.map((cell) => {
      if (cell.get('x') === x && cell.get('y') === y)
        return cell.set('isFlagged', !cell.get('isFlagged'));
      else
        return cell;
    });
  });
};

const isGameOver = (cells) => {
  return cells.some((row) => {
    return row.some((cell) => {
      return cell.get('isMine') && cell.get('isOpen');
    });
  });
};

const isWinner = (cells = []) => {
  return cells.every((row) => {
    return row.every((cell) => {
      return (!cell.get('isMine') && cell.get('isOpen')) 
              || (cell.get('isMine') && !cell.get('isOpen'));
    });
  });
};

const isPlaying = (cells = []) => {
  return cells.some((row) => {
    return row.some((cell) => {
      return cell.get('isOpen') || cell.get('isFlagged');
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
