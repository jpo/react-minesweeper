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

export const openCell = (id) => {
  return {
    type: 'OPEN_CELL', id 
  };
};

export const openEmpty = (id) => {
  return {
    type: 'OPEN_EMPTY', id 
  };
};

export const openFlag = (id) => {
  return {
    type: 'OPEN_FLAG', id
  };
};

export const openMine = (id) => {
  return {
    type: 'OPEN_MINE', id
  };
};

export const flagCell = (id) => {
  return {
    type: 'FLAG_CELL', id
  };
};
