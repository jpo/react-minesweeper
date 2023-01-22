import MineSweeperCell from '../MineSweeperCell';

describe('MineSweeperCell', () => {
  describe('constructor', () => {
    it('should create a new instance of MineSweeperCell', () => {
      const cell = new MineSweeperCell(0, 0);
      expect(cell).toBeInstanceOf(MineSweeperCell);
    });

    it('should set the row and column of the cell', () => {
      const cell = new MineSweeperCell(0, 0);
      expect(cell.row).toBe(0);
      expect(cell.col).toBe(0);
    });

    it('should set the revealed property to false', () => {
      const cell = new MineSweeperCell(0, 0);
      expect(cell.revealed).toBe(false);
    });

    it('should set the flagged property to false', () => {
      const cell = new MineSweeperCell(0, 0);
      expect(cell.flagged).toBe(false);
    });

    it('should set the value property to 0', () => {
      const cell = new MineSweeperCell(0, 0);
      expect(cell.value).toBe('');
    });
  });

  describe('isMine', () => {
    it('should return true if the value is *', () => {
      const cell = new MineSweeperCell(0, 0);
      cell.value = '*';
      expect(cell.isMine).toBe(true);
    });

    it('should return false if the value is not *', () => {
      const cell = new MineSweeperCell(0, 0);
      cell.value = 0;
      expect(cell.isMine).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true if the value is 0', () => {
      const cell = new MineSweeperCell(0, 0);
      cell.value = 0;
      expect(cell.isEmpty).toBe(true);
    });

    it('should return false if the value is a *', () => {
      const cell = new MineSweeperCell(0, 0);
      cell.value = '*';
      expect(cell.isEmpty).toBe(false);
    });

    it('should return false if the cell is a number', () => {
      const cell = new MineSweeperCell(0, 0);
      cell.value = 1;
      expect(cell.isEmpty).toBe(false);
    });
  });

  describe('hidden', () => {
    it('should return true if the cell is not revealed and not flagged', () => {
      const cell = new MineSweeperCell(0, 0);
      expect(cell.hidden).toBe(true);
    });

    it('should return false if the cell is revealed', () => {
      const cell = new MineSweeperCell(0, 0);
      cell.revealed = true;
      expect(cell.hidden).toBe(false);
    });

    it('should return false if the cell is flagged', () => {
      const cell = new MineSweeperCell(0, 0);
      cell.flagged = true;
      expect(cell.hidden).toBe(false);
    });
  });

  describe('get value', () => {
    describe('when the cell is hidden', () => {
      it('should return an empty string', () => {
        const cell = new MineSweeperCell(0, 0);
        expect(cell.value).toBe('');
      });
    });

    describe('when the cell is flagged', () => {
      it('should return F', () => {
        const cell = new MineSweeperCell(0, 0);
        cell.flagged = true;
        expect(cell.value).toBe('F');
      });
    });

    describe('when the cell is revealed', () => {
      describe('and the cell is a mine', () => {
        it('should return *', () => {
          const cell = new MineSweeperCell(0, 0);
          cell.revealed = true;
          cell.value = '*';
          expect(cell.value).toBe('*');
        });
      });

      describe('and the cell is empty', () => {
        it('should return an empty string', () => {
          const cell = new MineSweeperCell(0, 0);
          cell.revealed = true;
          cell.value = 0;
          expect(cell.value).toBe('');
        });
      });

      describe('and the cell is a number', () => {
        it('should return the number', () => {
          const cell = new MineSweeperCell(0, 0);
          cell.revealed = true;
          cell.value = 1;
          expect(cell.value).toBe(1);
        });
      });
    });
  });

  describe('set value', () => {
    it('should set the value of the cell', () => {
      const cell = new MineSweeperCell(0, 0);
      cell.value = 1;
      cell.reveal();
      expect(cell.value).toBe(1);
    });
  });

  describe('reveal', () => {
    it('should set the revealed property to true', () => {
      const cell = new MineSweeperCell(0, 0);
      cell.reveal();
      expect(cell.revealed).toBe(true);
    });
  });

  describe('flag', () => {
    it('should set the flagged property to true', () => {
      const cell = new MineSweeperCell(0, 0);
      cell.flag();
      expect(cell.flagged).toBe(true);
    });
  });

  describe('unflag', () => {
    it('should set the flagged property to false', () => {
      const cell = new MineSweeperCell(0, 0);
      cell.flagged = true;
      cell.unflag();
      expect(cell.flagged).toBe(false);
    });
  });
});