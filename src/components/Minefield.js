'use strict';

import React from 'react';
import MinefieldCell from './MinefieldCell'

require('styles//Minefield.css');

export default class Minefield extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var cells = this.props.cells.map((row, rowIndex) => {
      return (
        <tr key={'row-' + rowIndex}>
          {row.map((cell, cellIndex) => {
            return (
              <MinefieldCell key={'col-' + cellIndex}
                             x={cell.x}
                             y={cell.y}
                             isFlagged={cell.isFlagged}
                             isOpen={cell.isOpen}
                             isMine={cell.isMine}
                             value={cell.value}
                             openCell={this.props.openCell.bind(this)}
                             flagCell={this.props.flagCell.bind(this)}
              />
            )
          })}
        </tr>
      )
    });

    return (
      <div className="minefield">
        <table border="1">
          <tbody>
            {cells}
          </tbody>
        </table>
      </div>
    );
  }
}
