const initialState = {
  status: 'init',
  clock: 'off',
  difficulty: 0,
  cells: []
};

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
  return { ...state, difficulty, mines, cells };
};

const playGame = (state, action) => {
  let {cells} = state,
      {x,y}   = action;

  if (isGameOver(cells) || isWinner(cells))
    return state;

  switch(action.type) {
    case 'OPEN_CELL':
      return { ...state, cells: checkCell(cells, x, y) };
    case 'FLAG_CELL':
      return { ...state, cells: flagCell(cells, x, y) };
    default:
      return state;
  }
}

export const getStatus = (cells = []) => {
  if (isGameOver(cells)) return 'gameover';
  if (isWinner(cells))   return 'winner';
  if (isPlaying(cells))  return 'playing';

  return 'init';
}

export const getClock = (status = 'init') => {
  switch (status) {
    case 'playing':  return 'on';
    case 'winner':
    case 'gameover': return 'paused';
    case 'init':     
    default:         return 'off';
  }
}

export const countFlags = (cells = []) => {
  return cells.reduce((memo1, row) => {
    return memo1 + row.reduce((memo2, cell) => {
      return memo2 + (cell.isFlagged ? 1 : 0);
    }, 0);
  }, 0);
};

const createCells = (rows, cols, mines) => {
  let cells = [];

  // Create minefield matrix (with padding)
  for (let i = 0; i < rows + 2; i++) {
    cells[i] = [];
    for (let j = 0; j < cols + 2; j++) {
      cells[i][j] = 0;
    }
  }

  // Randomly lay mines within minefield
  let laid = 0;
  while (laid < mines) {
    let coordX = Math.floor(Math.random() * rows + 1);
    let coordY = Math.floor(Math.random() * cols + 1);
    if (cells[coordX][coordY] === 0) {
      cells[coordX][coordY] = '*';
      laid++;
    }
  }

  // Add numbers to neighboring minefield cells
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      for (let ii = (i - 1); ii <= (i + 1); ii++) {
        for (let jj = (j - 1); jj <= (j + 1); jj++) {
          if (cells[i][j] !== '*' && cells[ii][jj] === '*')
            cells[i][j]++;
        }
      }
    }
  }

  // Remove padding
  cells = cells.map((row) => {
    row.shift();
    row.pop();
    return row;
  });

  cells.shift();
  cells.pop();

  // Convert individual cells to objects.
  return cells.map((row, rowIndex) => {
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

const checkCell = (cells = [], x, y) => {
  let cell = cells[x][y];

  if (cell.isOpen)
    return cells;

  if (cell.isMine)
    return openMines(cells, x, y);

  if (cell.isEmpty)
    return openSiblings(cells, x, y);

  return openCell(cells, x, y);
};

const openMines = (cells) => {
  return cells.map((row) => {
    return row.map((cell) => {
      if (cell.isMine)
        return { ...cell, isOpen: true };
      return cell;
    });
  });
};

const openSiblings = (cells, x, y) => {
  if (cells[x]    === undefined) return cells;
  if (cells[x][y] === undefined) return cells;
  if (cells[x][y].isOpen)        return cells;

  let nextCells = openCell(cells, x, y);
  if (nextCells[x][y].isEmpty) {
    for (let xx = (x - 1); xx <= (x + 1); xx++) {
      for (let yy = (y - 1); yy <= (y + 1); yy++) {
        nextCells = openSiblings(nextCells, xx, yy);
      }
    }
  }

  return nextCells;
}

const openCell = (cells, x, y) => {
  return cells.map((row) => {
    return row.map((cell) => {
      if (cell.x === x && cell.y === y)
        return { ...cell, isOpen: true, isFlagged: false };
      else
        return cell;
    });
  });
}

const flagCell = (cells, x, y) => {
  return cells.map((row) => {
    return row.map((cell) => {
      if (cell.x === x && cell.y === y)
        return { ...cell, isFlagged: !cell.isFlagged };
      else
        return cell;
    });
  });
};

const isGameOver = (cells = []) => {
  return cells.some((row) => {
    return row.some((cell) => {
      return cell.isMine && cell.isOpen;
    });
  });
}

const isWinner = (cells = []) => {
  return cells.every((row) => {
    return row.every((cell) => {
      return (!cell.isMine && cell.isOpen) || (cell.isMine && !cell.isOpen);
    });
  });
}

const isPlaying = (cells = []) => {
  return cells.some((row) => {
    return row.some((cell) => {
      return cell.isOpen || cell.isFlagged;
    });
  });
}

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
