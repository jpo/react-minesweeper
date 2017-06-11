import React from 'react';
import {List} from 'immutable';
import Cell from './Cell';
import '../styles/Minefield.css';

const Minefield = ({rows, cols, cells}) => {
  const renderField = (cells) =>
    <div className="minefield">
      <table>
        <tbody>
          {cells.map((r,i) => renderRow(r,i))}
        </tbody>
      </table>
    </div>;

  const renderRow = (row, index) =>
    <tr key={`row-${index}`}>
      {row.map((c,i) => renderCell(c,i))}
    </tr>;

  const renderCell = (cell, index) =>
    <Cell key={`col-${index}`} cell={cell} />;

  const toMatrix = (cells) =>
    cells.reduce((r,c,i) => r.update(i%rows, List(), x => x.push(c)), List());

  return renderField(toMatrix(cells));
};

export default Minefield;
