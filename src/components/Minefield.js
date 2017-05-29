import React from 'react';
import Cell from './Cell';
import '../styles/Minefield.css';

const Minefield = ({cells}) => {
  const renderField = (cells) => {
    return (
      <div className="minefield">
        <table>
          <tbody>
            {cells.map((r,i) => renderRow(r,i))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderRow = (row, index) => {
    return (
      <tr key={'row-' + index}>
        {row.map((c,i) => renderCell(c,i))}
      </tr>
    );
  };

  const renderCell = (cell, index) => {
    return (
      <Cell key={'col-' + index} {...cell} />
    );
  };

  return renderField(cells);
};

export default Minefield;
