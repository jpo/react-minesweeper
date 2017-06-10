import * as reducers from '../reducers';

describe('NEW_GAME', () => {
  let state, cells;

  beforeAll(() => {
    state = reducers.gameState({}, {type: 'NEW_GAME', difficulty: 0});
    cells = state.get('cells');
  });

  test('it should have cells', () => {
    expect(state.has('cells')).toBeTruthy();
  });

  test('it should have 81 cells', () => {
    expect(cells.size).toBe(81);
  });

  /*
  test('cells should have 9 columns', () => {
    expect(state.getIn(['cells', 0]).size).toBe(9);
  });
  */

  test('cells should have 10 mines', () => {
    let count = cells.count((c) => c.get('value') === '*');
    expect(count).toBe(10);
  });
});
