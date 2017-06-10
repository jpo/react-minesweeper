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

export const openCell = (cell, id) => {
  return {
    type: 'OPEN_CELL', cell, id 
  };
};

export const openEmpty = (cell, id) => {
  return {
    type: 'OPEN_EMPTY', cell, id 
  };
};

export const openFlag = (cell, id) => {
  return {
    type: 'OPEN_FLAG', cell, id
  };
};

export const openMine = (cell, id) => {
  return {
    type: 'OPEN_MINE', cell, id
  };
};

export const flagCell = (cell, id) => {
  return {
    type: 'FLAG_CELL', cell, id
  };
};
