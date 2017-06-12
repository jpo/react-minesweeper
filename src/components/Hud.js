import React from 'react';
import Clock from './Clock';
import Counter from './Counter';
import Face from './Face';
import '../styles/Hud.css';

const Hud = ({difficulty, stats, status}) => {
  let unflagged = stats.get('unflagged');

  return (
    <div className="hud">
      <Clock status={status} />
      <Face status={status} difficulty={difficulty} />
      <Counter count={unflagged} />
    </div>
  );
};

export default Hud;
