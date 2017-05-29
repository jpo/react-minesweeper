import React from 'react';
import Clock from './Clock';
import Counter from './Counter';
import Face from './Face';
import '../styles/Hud.css';

const Hud = ({difficulty, clock, status, mines, flagged}) => {
  return (
    <div className="hud">
      <Clock mode={clock} />
      <Face status={status} difficulty={difficulty} />
      <Counter count={mines - flagged} />
    </div>
  );
};

export default Hud;
