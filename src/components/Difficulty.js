import React from 'react';
import Button from './Button';
import '../styles/Difficulty.css';

const Difficulty = ({value}) =>
  <div className="difficulty">
    <Button value={0} active={value === 0} text="Beginner" />
    <Button value={1} active={value === 1} text="Intermediate" />
    <Button value={2} active={value === 2} text="Expert" />
  </div>;

export default Difficulty;
