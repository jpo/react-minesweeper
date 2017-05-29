import React from 'react';
import { connect } from 'react-redux';
import { openCell, flagCell } from '../actions';

let Cell = ({dispatch, isOpen, isMine, isFlagged, value, x, y}) => {
  const getClassName = () => {
    if (isOpen && isMine)
      return 'mine';
    else if (isOpen)
      return 'open';
    else
      return 'closed';
  };

  const getValue = () => {
    if (!isOpen && isFlagged)
      return <i className="fa fa-flag" />;
    else if (isOpen && isMine)
      return <i className="fa fa-bomb" />;
    else if (isOpen && value > 0)
      return value;
    else
      return '';
  };

  const onOpenCell = () => {
    dispatch(openCell(x, y));
  };

  const onFlagCell = (e) => {
    e.preventDefault();
    dispatch(flagCell(x, y));
  };

  return (
    <td className={getClassName()}
        onClick={onOpenCell}
        onContextMenu={onFlagCell}>
      {getValue()}
    </td>
  );
};

Cell = connect()(Cell);
export default Cell;
