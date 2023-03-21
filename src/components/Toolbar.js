import React from 'react';
import Clock from './Clock';
import Counter from './Counter';
import Face from './Face';
import { useGame } from './GameContext';
import './Toolbar.css';

function Toolbar () {
  const { game, resetGame } = useGame();

  return (
    <div className="toolbar">
      <Clock started={game.status === 'playing'} tick={() => game.elapsedTime} />
      <Face status={game.status} onClick={resetGame} />
      <Counter value={game.remainingFlags} />
    </div>
  );
};

export default Toolbar;