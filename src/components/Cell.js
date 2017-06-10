import React from 'react';
import {connect} from 'react-redux';
import {openCell, openEmpty, openFlag, openMine, flagCell} from '../actions';

let Cell = ({dispatch, ...cell}) => {
  const isOpen    = cell.status === 'open';
  const isFlag    = cell.status === 'flag';
  const isEmpty   = cell.value  === 0;
  const isMine    = cell.value  === '*';

  const className = `${cell.status} ${(isOpen && isMine) ? "mine" : ""}`;

  const value     = (isFlag)             ? <i className="fa fa-flag" /> :
                    (isOpen && isMine)   ? <i className="fa fa-bomb" /> :
                    (isOpen && !isEmpty) ? cell.value : '';

  const onClick = () => {
    if (isOpen) return;

    if (isMine) 
      dispatch(openMine(cell, cell.id));
    else if (isEmpty)
      dispatch(openEmpty(cell, cell.id));
    else if (isFlag)
      dispatch(openFlag(cell, cell.id));
    else
      dispatch(openCell(cell, cell.id));
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    dispatch(flagCell(cell, cell.id));
  };

  return (
    <td className={className} onClick={onClick} onContextMenu={onContextMenu}>
      {value}
    </td>
  );
};

Cell = connect()(Cell);
export default Cell;
