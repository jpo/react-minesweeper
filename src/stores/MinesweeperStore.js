'use strict';

export default class MinesweeperStore {
  // Difficulties:
  //  Beginner = 9x9 field with 10 mines
  //  Intermediate = 16x16 field with 40 mines
  //  Expert = 30 x 16 field with 99 mines
  static generateMinefield(x, y, mineCount) {
    var mines    = [],
        solution = [];

    // Create mines and solution grid (with padding)
    for (var i = 0; i < x + 2; i++) {
      mines[i] = [];
      solution[i] = [];
      for (var j = 0; j < y + 2; j++) {
        mines[i][j] = false;
        solution[i][j] = ' ';
      }
    }

    var minesLaid = 0;
    while (minesLaid < mineCount) {
      var coordX = Math.floor(Math.random() * x + 1);
      var coordY = Math.floor(Math.random() * y + 1);
      if (!mines[coordX][coordY]) {
        mines[coordX][coordY] = true;
        minesLaid++;
      }
    }

    // Solve
    for (var i = 1; i <= x; i++) {
      for (var j = 1; j <= y; j++) {
        for (var ii = (i - 1); ii <= (i + 1); ii++) {
          for (var jj = (j - 1); jj <= (j + 1); jj++) {
            if (mines[ii][jj])
              solution[i][j]++;
          }
        }
      }
    }

    for (var i = 1; i <= x; i++) {
      for (var j = 1; j <= y; j++) {
        if (mines[i][j])
          solution[i][j] = '*';
      }
    }

    solution = solution.map((r) => {
      r.shift();
      r.pop();
      return r;
    })

    solution.shift();
    solution.pop();

    return solution;
  }
}
