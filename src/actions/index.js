export const newGame = (difficulty) => {
  return {
    type: 'NEW_GAME', difficulty
  };
};

export const openCell = (x, y) => {
  return {
    type: 'OPEN_CELL', x, y
  };
};

export const flagCell = (x, y) => {
  return {
    type: 'FLAG_CELL', x, y
  };
};
