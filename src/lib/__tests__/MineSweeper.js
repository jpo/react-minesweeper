import MineSweeper from '../MineSweeper';
import MineSweeperCell from '../MineSweeperCell';

function createMockGame() {
  const game = new MineSweeper({ rows: 3, cols: 3, mines: 2 })

  game.cells = [
    [
      new MineSweeperCell(0, 0, 0),
      new MineSweeperCell(0, 1, 1),
      new MineSweeperCell(0, 2, 1)
    ],
    [
      new MineSweeperCell(1, 0, 1),
      new MineSweeperCell(1, 1, 2),
      new MineSweeperCell(1, 2, '*'),
    ],
    [
      new MineSweeperCell(2, 0, '*'),
      new MineSweeperCell(2, 1, 2),
      new MineSweeperCell(2, 2, 1),
    ]
  ]

  return game;
}

describe('MineSweeper', () => {
  describe('constructor', () => {
    it('should create a new beginner game', () => {
      const game = new MineSweeper({ difficulty: 0 });
      expect(game).toBeInstanceOf(MineSweeper);
      expect(game.rows).toBe(9);
      expect(game.cols).toBe(9);
      expect(game.mines).toBe(10);
      expect(game.remainingCells).toBe(71);
      expect(game.remainingFlags).toBe(10);
      expect(game.startTime).toBeNull();
      expect(game.stopTime).toBeNull();
      expect(game.status).toBe(MineSweeper.STATUS.NEW);
      expect(game.cells).toHaveLength(9);
      expect(game.cells[0]).toHaveLength(9);
    });

    it('should create a new intermediate game', () => {
      const game = new MineSweeper({ difficulty: 1 });
      expect(game).toBeInstanceOf(MineSweeper);
      expect(game.rows).toBe(16);
      expect(game.cols).toBe(16);
      expect(game.mines).toBe(40);
      expect(game.remainingCells).toBe(216);
      expect(game.remainingFlags).toBe(40);
      expect(game.startTime).toBeNull();
      expect(game.stopTime).toBeNull();
      expect(game.status).toBe(MineSweeper.STATUS.NEW);
      expect(game.cells).toHaveLength(16);
      expect(game.cells[0]).toHaveLength(16);
    });

    it('should create a new expert game', () => {
      const game = new MineSweeper({ difficulty: 2 });
      expect(game).toBeInstanceOf(MineSweeper);
      expect(game.rows).toBe(16);
      expect(game.cols).toBe(30);
      expect(game.mines).toBe(99);
      expect(game.remainingCells).toBe(381);
      expect(game.remainingFlags).toBe(99);
      expect(game.startTime).toBeNull();
      expect(game.stopTime).toBeNull();
      expect(game.status).toBe(MineSweeper.STATUS.NEW);
      expect(game.cells).toHaveLength(16);
      expect(game.cells[0]).toHaveLength(30);
    });

    it('should create a new custom game', () => {
      const game = new MineSweeper({ rows: 2, cols: 2, mines: 1 });
      expect(game).toBeInstanceOf(MineSweeper);
      expect(game.rows).toBe(2);
      expect(game.cols).toBe(2);
      expect(game.mines).toBe(1);
      expect(game.remainingCells).toBe(3);
      expect(game.remainingFlags).toBe(1);
      expect(game.startTime).toBeNull();
      expect(game.stopTime).toBeNull();
      expect(game.status).toBe(MineSweeper.STATUS.NEW);
      expect(game.cells).toHaveLength(2);
      expect(game.cells[0]).toHaveLength(2);
    });
  });

  describe('isNewGame', () => {
    let game;

    beforeEach(() => {
      game = createMockGame();
    });

    it('should return true if the game is a new game', () => {
      expect(game.isNewGame).toBe(true);
    });

    it('should return false if the game is not a new game', () => {
      game.status = MineSweeper.STATUS.PLAYING;
      expect(game.isNewGame).toBe(false);
    });
  });

  describe('isPlaying', () => {
    let game;

    beforeAll(() => {
      game = createMockGame();
    });

    it('should return true if the game is in progress', () => {
      game.status = MineSweeper.STATUS.PLAYING;
      expect(game.isPlaying).toBe(true);
    });

    it('should return false if the game is not in progress', () => {
      game.status = MineSweeper.STATUS.NEW;
      expect(game.isPlaying).toBe(false);
    });
  });

  describe('isWinner', () => {
    let game;

    beforeAll(() => {
      game = createMockGame();
    });

    it('should return true if the game is won', () => {
      game.status = MineSweeper.STATUS.WON;
      expect(game.isWinner).toBe(true);
    });

    it('should return false if the game is not won', () => {
      game.status = MineSweeper.STATUS.NEW;
      expect(game.isWinner).toBe(false);
    });
  });

  describe('isLoser', () => {
    let game;

    beforeAll(() => {
      game = createMockGame();
    });

    it('should return true if the game is lost', () => {
      game.status = MineSweeper.STATUS.LOST;
      expect(game.isLoser).toBe(true);
    });

    it('should return false if the game is not lost', () => {
      game.status = MineSweeper.STATUS.NEW;
      expect(game.isLoser).toBe(false);
    });
  });

  describe('isGameOver', () => {
    let game;

    beforeAll(() => {
      game = createMockGame();
    });

    it('should return true if the game was won', () => {
      game.status = MineSweeper.STATUS.WON;
      expect(game.isGameOver).toBe(true);
    });

    it('should return true if the game was lost', () => {
      game.status = MineSweeper.STATUS.LOST;
      expect(game.isGameOver).toBe(true);
    });

    it('should return false if the game is not over', () => {
      game.status = MineSweeper.STATUS.NEW;
      expect(game.isGameOver).toBe(false);
    });
  });

  describe('elapsedTime', () => {
    let game;

    beforeEach(() => {
      game = createMockGame();
    });

    describe('when it is a new game', () => {
      it('should return 0', () => {
        expect(game.elapsedTime).toBe(0);
      });
    });

    describe('when the game is in progress', () => {
      it('should return the elapsed time', () => {
        Date.now = jest.fn(() => new Date(2020, 0, 1, 0, 0, 0));
        game.startGame();
        Date.now = jest.fn(() => new Date(2020, 0, 1, 0, 0, 10));
        expect(game.elapsedTime).toBe(10);
      });
    });

    describe('when the game is over', () => {
      it('should return the elapsed time', () => {
        Date.now = jest.fn(() => new Date(2020, 0, 1, 0, 0, 0));
        game.startGame();
        Date.now = jest.fn(() => new Date(2020, 0, 1, 0, 0, 10));
        game.stopGame(MineSweeper.STATUS.WON);
        expect(game.elapsedTime).toBe(10);
      });
    });
  });

  describe('startGame', () => {
    describe('when it is a new game', () => {
      let game;

      beforeAll(() => {
        game = createMockGame();
        game.startGame();
      });

      it('should set the status to playing', () => {
        expect(game.status).toBe(MineSweeper.STATUS.PLAYING);
      });

      it('should set the start time', () => {
        expect(game.startTime).not.toBeNull();
      });
    });

    describe('when the game is in progress', () => {
      it('should not change the status', () => {
        let game = createMockGame();
        game.status = MineSweeper.STATUS.PLAYING;
        game.startGame();
        expect(game.status).toBe(MineSweeper.STATUS.PLAYING);
      });
    });

    describe('when the game is over', () => {
      it('should not change the status', () => {
        const game = createMockGame();
        game.startGame();
        game.stopGame(MineSweeper.STATUS.WON);
        game.startGame();
        expect(game.status).toBe(MineSweeper.STATUS.WON);
      });
    });
  });

  describe('stopGame', () => {
    describe('when it is a new game', () => {
      let game;

      beforeAll(() => {
        game = createMockGame();
        game.stopGame(MineSweeper.STATUS.WON);
      })

      it('should not change the status', () => {
        expect(game.status).toBe(MineSweeper.STATUS.NEW);
      });

      it('should not set the stop time', () => {
        expect(game.stopTime).toBeNull();
      });
    });

    describe('when the game is in progress', () => {
      let game;

      beforeEach(() => {
        game = new createMockGame();
        game.startGame();
      });

      describe('and the game is won', () => {
        it('should set the stop time', () => {
          game.stopGame(MineSweeper.STATUS.WON);
          expect(game.stopTime).not.toBeNull();
        });
      });

      describe('and the game is lost', () => {
        it('should set the stop time', () => {
          game.stopGame(MineSweeper.STATUS.LOST);
          expect(game.stopTime).not.toBeNull();
        });
      });

      describe('and the game is not won or lost', () => {
        it('should not set the stop time', () => {
          game.stopGame(MineSweeper.STATUS.PLAYING);
          expect(game.stopTime).toBeNull();
        });
      });
    });

    describe('when the game is over', () => {
      let game;

      beforeAll(() => {
        game = createMockGame();
        game.startGame();
        game.stopGame(MineSweeper.STATUS.WON);
      });

      it('should not change the status', () => {
        game.stopGame(MineSweeper.STATUS.PLAYING);
        expect(game.status).toBe(MineSweeper.STATUS.WON);
      });

      it('should not change the stop time', () => {
        const stopTime = game.stopTime;
        game.stopGame(MineSweeper.STATUS.LOST);
        expect(game.stopTime).toBe(stopTime);
      });
    });
  });

  describe('revealCell', () => {
    let game;

    describe('when it is a new game', () => {
      beforeAll(() => {
        game = createMockGame();
        game.revealCell(0, 1);
      });

      it('should start the game', () => {
        expect(game.status).toBe(MineSweeper.STATUS.PLAYING);
      });

      it('should reveal the cell', () => {
        expect(game.cells[0][1].revealed).toBe(true);
      });

      it('should decrement the remaining cells', () => {
        expect(game.remainingCells).toBe(6);
      });
    });

    describe('when the game is in progress', () => {
      beforeAll(() => {
        game = createMockGame();
        game.startGame();
      });

      describe('and the cell is already revealed', () => {
        beforeAll(() => {
          game.revealCell(0, 1);
        });

        beforeEach(() => {
          game.revealCell(0, 1);
        });

        afterAll(() => {
          game.cells[0][1].revealed = false;
          game.remainingCells++;
        });

        it('should not change the cell', () => {
          expect(game.cells[0][1].revealed).toBe(true);
        });

        it('should not decrement the remaining cells', () => {
          expect(game.remainingCells).toBe(6);
        });

        it('should not change the status', () => {
          expect(game.status).toBe(MineSweeper.STATUS.PLAYING);
        });
      });

      describe('and the cell is a number', () => {
        beforeAll(() => {
          game.revealCell(0, 1);
        });

        afterAll(() => {
          game.cells[0][1].revealed = false;
          game.remainingCells++;
        });

        it('should reveal the cell', () => {
          expect(game.cells[0][1].revealed).toBe(true);
        });

        it('should decrement the remaining cells', () => {
          expect(game.remainingCells).toBe(6);
        });

        it('should not change the status', () => {
          expect(game.status).toBe(MineSweeper.STATUS.PLAYING);
        });
      });

      describe('and the cell is a mine', () => {
        beforeAll(() => {
          game.revealCell(1, 2);
        });

        afterAll(() => {
          game.cells[1][2].revealed = false;
          game.status = MineSweeper.STATUS.PLAYING;
          game.stopTime = null;
        });

        it('should reveal the cell', () => {
          expect(game.cells[1][2].revealed).toBe(true);
        });

        it('should not decrement the remaining cells', () => {
          expect(game.remainingCells).toBe(7);
        });

        it('should set the status to lost', () => {
          expect(game.status).toBe(MineSweeper.STATUS.LOST);
        });

        it('should stop the game', () => {
          expect(game.stopTime).not.toBeNull();
        });
      });

      describe('and the cell is empty', () => {
        beforeAll(() => {
          game.revealCell(0, 0);
        });

        afterAll(() => {
          game.cells[0][0].revealed = false;
          game.cells[0][1].revealed = false;
          game.cells[1][0].revealed = false;
          game.cells[1][1].revealed = false;
          game.remainingCells += 4;
        });

        it('should reveal the cell', () => {
          expect(game.cells[0][0].revealed).toBe(true);
        });

        it('should reveal the adjacent cells', () => {
          expect(game.cells[0][1].revealed).toBe(true);
          expect(game.cells[1][0].revealed).toBe(true);
          expect(game.cells[1][1].revealed).toBe(true);
        });

        it('should not reveal the non adjacent cells', () => {
          expect(game.cells[0][2].revealed).toBe(false);
          expect(game.cells[1][2].revealed).toBe(false);
          expect(game.cells[2][0].revealed).toBe(false);
          expect(game.cells[2][1].revealed).toBe(false);
          expect(game.cells[2][2].revealed).toBe(false);
        });

        it('should decrement the remaining cells', () => {
          expect(game.remainingCells).toBe(3);
        });
      });

      describe('and there are no remaining cells', () => {
        beforeAll(() => {
          game.revealCell(0, 0);
          game.revealCell(0, 2);
          game.revealCell(2, 1);
          game.revealCell(2, 2);
        });

        afterAll(() => {
          game.cells[0][0].revealed = false;
          game.cells[0][2].revealed = false;
          game.cells[2][0].revealed = false;
          game.cells[2][2].revealed = false;
          game.remainingCells += 4;
          game.status = MineSweeper.STATUS.PLAYING;
          game.stopTime = null;
        });

        it('should set the status to won', () => {
          expect(game.status).toBe(MineSweeper.STATUS.WON);
        });

        it('should stop the game', () => {
          expect(game.stopTime).not.toBeNull();
        });
      });
    });
  });

  describe('toggleFlag', () => {
    let game;

    beforeAll(() => {
      game = createMockGame();
      game.startGame();
    });

    describe('when the cell is flagged', () => {
      beforeAll(() => {
        game.flagCell(0, 0);
      });

      afterAll(() => {
        game.unflagCell(0, 0);
      });

      it('should unflag the cell', () => {
        game.toggleFlag(0, 0);
        expect(game.cells[0][0].flagged).toBe(false);
      });
    });

    describe('when the cell is not flagged', () => {
      afterAll(() => {
        game.unflagCell(0, 0);
      });

      it('should flag the cell', () => {
        game.toggleFlag(0, 0);
        expect(game.cells[0][0].flagged).toBe(true);
      });
    });
  });

  describe('flagCell', () => {
    describe('when it is a new game', () => {
      let game;

      beforeAll(() => {
        game = createMockGame();
      });

      it('should start the game', () => {
        game.flagCell(0, 0);
        expect(game.isPlaying).toBe(true);
      });
    });

    describe('when the game is in progress', () => {
      let game;

      beforeAll(() => {
        game = createMockGame();
        game.startGame();
      });

      describe('and the cell is already flagged', () => {
        beforeAll(() => {
          game.flagCell(0, 0);
        });

        afterAll(() => {
          game.unflagCell(0, 0);
        });

        beforeEach(() => {
          game.flagCell(0, 0);
        });

        it('should not change the flag', () => {
          expect(game.cells[0][0].flagged).toBe(true);
        });

        it('should not decrement the remaining flags', () => {
          expect(game.remainingFlags).toBe(1);
        });
      });

      describe('and the cell is not flagged', () => {
        beforeEach(() => {
          game.flagCell(0, 0);
        });

        afterAll(() => {
          game.unflagCell(0, 0);
        });

        it('should flag the cell', () => {
          expect(game.cells[0][0].flagged).toBe(true);
        });

        it('should decrement the remaining flags', () => {
          expect(game.remainingFlags).toBe(1);
        });
      });

      describe('and there are no remaining flags', () => {
        beforeAll(() => {
          game.flagCell(0, 0);
          game.flagCell(0, 1);
        });

        beforeEach(() => {
          game.flagCell(0, 2);
        });

        afterAll(() => {
          game.unflagCell(0, 0);
          game.unflagCell(0, 1);
        });

        it('should not flag the cell', () => {
          expect(game.cells[0][2].flagged).toBe(false);
        });

        it('should not decrement the remaining flags', () => {
          expect(game.remainingFlags).toBe(0);
        });
      });

      describe('and the cell is already revealed', () => {
        beforeAll(() => {
          game.revealCell(0, 1);
        });

        beforeEach(() => {
          game.flagCell(0, 1);
        });

        afterAll(() => {
          game.cells[0][1].revealed = false;
          game.remainingCells++;
        });

        it('should not change the flag', () => {
          expect(game.cells[0][1].flagged).toBe(false);
        });

        it('should not decrement the remaining flags', () => {
          expect(game.remainingFlags).toBe(2);
        });
      });
    });

    describe('when the game is over', () => {
      let game;

      beforeAll(() => {
        game = createMockGame();
        game.startGame();
        game.stopGame(MineSweeper.STATUS.WON);
      });

      beforeEach(() => {
        game.flagCell(0, 0);
      });

      it('should not change the flag', () => {
        expect(game.cells[0][0].flagged).toBe(false);
      });

      it('should not decrement the remaining flags', () => {
        expect(game.remainingFlags).toBe(2);
      });
    });
  });
});