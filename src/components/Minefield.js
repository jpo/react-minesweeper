'use strict';

import React from 'react';
import Cell from './Cell'

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
              <Cell key={'col-' + cellIndex}
                    x={cell.x}
                    y={cell.y}
                    isFlagged={cell.isFlagged}
                    isOpen={cell.isOpen}
                    isMine={cell.isMine}
                    value={cell.value}
                    onOpenCell={this.props.onOpenCell.bind(this)}
                    onFlagCell={this.props.onFlagCell.bind(this)} />
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
