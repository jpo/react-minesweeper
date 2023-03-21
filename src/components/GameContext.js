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

  const newGame = (difficulty) => {
    const game = new MineSweeper({ difficulty });
    setGame(game);
  }

  const resetGame = () => {
    const { rows, cols, mines } = game;
    const _game = new MineSweeper({ rows, cols, mines });
    setGame(_game);
  }

  const updateGame = () => {
    setGame((prevGame) => Object.assign(Object.create(Object.getPrototypeOf(prevGame)), prevGame));
  };

  const revealCell = (row, col) => {
    game.revealCell(row, col);
    updateGame(game);
  }

  const flagCell = (row, col) => {
    game.toggleFlag(row, col);
    updateGame(game);
  }

  return (
    <GameContext.Provider value={{
      game,
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
