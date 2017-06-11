import React from 'react';
import {connect} from 'react-redux';
import {openCell, openEmpty, openFlag, openMine, flagCell} from '../actions';

let Cell = ({dispatch, cell}) => {
  const isOpen    = cell.get('status') === 'open';
  const isFlag    = cell.get('status') === 'flag';
  const isEmpty   = cell.get('value')  === 0;
  const isMine    = cell.get('value')  === '*';

  const className = `${cell.get('status')} ${(isOpen && isMine) ? "mine" : ""}`;

  const value     = (isFlag)             ? <i className="fa fa-flag" /> :
                    (isOpen && isMine)   ? <i className="fa fa-bomb" /> :
                    (isOpen && !isEmpty) ? cell.get('value') : '';

  const onClick = () => {
    if (isOpen) return;

    if (isMine) 
      dispatch(openMine(cell.get('id')));
    else if (isEmpty)
      dispatch(openEmpty(cell.get('id')));
    else if (isFlag)
      dispatch(openFlag(cell.get('id')));
    else
      dispatch(openCell(cell.get('id')));
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    dispatch(flagCell(cell.get('id')));
  };

  return (
    <td className={className} onClick={onClick} onContextMenu={onContextMenu}>
      {value}
    </td>
  );
};

Cell = connect()(Cell);
export default Cell;
