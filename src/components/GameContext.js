import { createContext, useContext, useState } from "react";
import MineSweeper from "../lib/MineSweeper";

const GameContext = createContext({});

function useGame() {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
}

function GameProvider({ children }) {
  const [game, setGame] = useState(new MineSweeper({ difficulty: 0 }));
  const [status, setStatus] = useState(game.status);
  const [cells, setCells] = useState(game.cells);

  const newGame = (difficulty) => {
    const game = new MineSweeper({ difficulty });
    setGame(game);
    setStatus(game.status);
    setCells([...game.cells]);
  }

  const resetGame = () => {
    const { rows, cols, mines } = game;
    const _game = new MineSweeper({ rows, cols, mines });
    setGame(_game);
    setStatus(_game.status);
    setCells([..._game.cells]);
  }

  const revealCell = (row, col) => {
    game.revealCell(row, col);
    setStatus(game.status);
    setCells([...game.cells]);
  }

  const flagCell = (row, col) => {
    game.toggleFlag(row, col);
    setStatus(game.status);
    setCells([...game.cells]);
  }

  return (
    <GameContext.Provider value={{
      game,
      status,
      cells,
      newGame,
      resetGame,
      revealCell,
      flagCell,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export {
  GameProvider,
  useGame,
}
