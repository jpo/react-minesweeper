import React from 'react';
import {connect} from 'react-redux';
import {openCell, openEmpty, openFlag, openMine, flagCell} from '../actions';

let Cell = ({dispatch, ...cell}) => {
  const isOpen  = cell.status === 'open';
  const isFlag  = cell.status === 'flag';
  const isEmpty = cell.value  === 0;
  const isMine  = cell.value  === '*';

  const getClassName = () => {
    return `${cell.status} ${(isOpen && isMine) ? "mine" : ""}`;
  };

  const getValue = () => {
    if (isFlag)             return <i className="fa fa-flag" />;
    if (isOpen && isMine)   return <i className="fa fa-bomb" />;
    if (isOpen && !isEmpty) return cell.value;
    return '';
  };

  const onClick = () => {
    if (isOpen) return;

    if (isMine) 
      dispatch(openMine(cell.x, cell.y));
    else if (isEmpty)
      dispatch(openEmpty(cell.x, cell.y));
    else if (isFlag)
      dispatch(openFlag(cell.x, cell.y));
    else
      dispatch(openCell(cell.x, cell.y));
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    dispatch(flagCell(cell.x, cell.y));
  };

  return (
    <td className={getClassName()} onClick={onClick} onContextMenu={onContextMenu}>
      {getValue()}
    </td>
  );
};

Cell = connect()(Cell);
export default Cell;
