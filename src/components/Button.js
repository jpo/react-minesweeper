import React from 'react';
import {connect} from 'react-redux';
import {newGame} from '../actions';

let Button = ({dispatch, value, text, active}) => {
  const onClick = () => {
    dispatch(newGame(value));
  };

  return (
    <button className={active ? 'active' : ''}
            value={value}
            onClick={onClick}>
      {text}
    </button>
  );
};

Button = connect()(Button);
export default Button;
