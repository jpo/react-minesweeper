import React from "react";
import "./Difficulty.css";
import { useGame } from "./GameContext";

function Difficulty() {
  const { newGame } = useGame();

  return (
    <div className="difficulty">
      <button onClick={() => newGame(0)}>Beginner</button>
      <button onClick={() => newGame(1)}>Intermediate</button>
      <button onClick={() => newGame(2)}>Expert</button>
    </div>
  );
}

export default Difficulty;
