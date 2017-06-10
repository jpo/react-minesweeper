import React from 'react';
import {connect} from 'react-redux';
import {resetGame} from '../actions';

let Face = ({dispatch, status}) => {
  const icon = status === 'winner'   ? 'fa fa-thumbs-o-up' :
               status === 'gameover' ? 'fa fa-frown-o'     :
                                       'fa fa-smile-o';

  const onClick = () => {
    dispatch(resetGame());
  };

  return (
    <div className="face" onClick={onClick}>
      <i className={icon} />
    </div>
  );
};

Face = connect()(Face);
export default Face;
