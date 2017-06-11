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
      return resetGame(state, action);
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
  return state.merge({ difficulty, rows, cols, mines, cells });
};

const resetGame = (state, action) => {
  let { rows, cols, mines } = state.toObject();
  return state.set('cells', createCells(rows, cols, mines));
};

const openCell = (state, {id}) =>
  state.setIn(['cells', id, 'status'], 'open');

const openEmpty = (state, {id}) => {
  const cascade = (cells, id) => {
    let x = cells.getIn([id, 'x']),
        y = cells.getIn([id, 'y']);

    return cells
      .setIn([id, 'status'], 'open')
      .update(cs => cs.getIn([id, 'value']) === 0
        ? cs.filter(c => c.get('x') >= x-1 && c.get('x') <= x+1
                      && c.get('y') >= y-1 && c.get('y') <= y+1
                      && c.get('status') !== 'open')
            .reduce((m,c) => cascade(m, c.get('id')), cs)
        : cs);
  };

  return state.update('cells', cells => cascade(cells, id));
};

const openFlag = (state, {id}) =>
  state.setIn(['cells', id, 'status'], 'open');

const openMine = (state, {id}) =>
  state.update('cells', cs => cs.map(c => c.get('value') === '*' ? c.set('status', 'open') : c));

const flagCell = (state, {id}) =>
  state.updateIn(['cells', id, 'status'], s => s === 'flag' ? 'closed' : 'flag' );

const createCells = (rows, cols, mines) =>
  List(Repeat(0, rows*cols))                      
    .merge(Repeat('*', mines)).sortBy(Math.random)
    .map((v,i) => Map({x: (i/rows|0), y: (i%cols), id: i, value: v, status: 'closed'}))
    .update(cells => cells.reduce((m,c,i) =>
      m.updateIn([i, 'value'], v => v === '*' ? '*' : m.count((n,j) => 
          c.get('x') >= n.get('x')-1 && c.get('x') <= n.get('x')+1 &&
          c.get('y') >= n.get('y')-1 && c.get('y') <= n.get('y')+1 &&
          i != j && n.get('value') === '*')
      ), cells));

const getDifficulty = (difficulty) => [
    {rows: 9, cols: 9, mines: 10},
    {rows: 16, cols: 16, mines: 40},
    {rows: 16, cols: 30, mines: 99}
  ][difficulty];
