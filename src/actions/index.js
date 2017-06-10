export const newGame = (difficulty) => {
  return {
    type: 'NEW_GAME', difficulty
  };
};

export const resetGame = () => {
  return {
    type: 'RESET_GAME'
  };
};

export const openCell = (x,y) => {
  return {
    type: 'OPEN_CELL', x, y
  };
};

export const openEmpty = (x,y) => {
  return {
    type: 'OPEN_EMPTY', x, y
  };
};

export const openFlag = (x,y) => {
  return {
    type: 'OPEN_FLAG', x, y
  };
};

export const openMine = (x,y) => {
  return {
    type: 'OPEN_MINE', x, y
  };
};

export const flagCell = (x,y) => {
  return {
    type: 'FLAG_CELL', x, y
  };
};
