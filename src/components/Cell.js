import React from 'react';
import {connect} from 'react-redux';
import {openCell, openEmpty, openFlag, openMine, flagCell} from '../actions';

let Cell = ({dispatch, ...cell}) => {
  const getClassName = () => {
    if (cell.isOpen && cell.isMine)
      return 'mine';
    else if (cell.isOpen)
      return 'open';
    else
      return 'closed';
  };

  const getValue = () => {
    if (!cell.isOpen && cell.isFlagged)
      return <i className="fa fa-flag" />;
    else if (cell.isOpen && cell.isMine)
      return <i className="fa fa-bomb" />;
    else if (cell.isOpen && cell.value > 0)
      return cell.value;
    else
      return '';
  };

  const onClick = () => {
    if (cell.isOpen) return;

    if (cell.isMine) 
      dispatch(openMine(cell.x, cell.y));
    else if (cell.isEmpty)
      dispatch(openEmpty(cell.x, cell.y));
    else if (cell.isFlagged)
      dispatch(openFlag(cell.x, cell.y));
    else
      dispatch(openCell(cell.x, cell.y));
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    dispatch(flagCell(cell.x, cell.y));
  };

  return (
    <td className={getClassName()}
        onClick={onClick}
        onContextMenu={onContextMenu}>
      {getValue()}
    </td>
  );
};

Cell = connect()(Cell);
export default Cell;
