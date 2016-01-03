'use strict';

import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  getClassName() {
    if (this.props.isOpen && this.props.isMine)
      return 'mine';
    else if (this.props.isOpen)
      return 'open';
    else
      return 'closed';
  }

  getValue() {
    if (!this.props.isOpen && this.props.isFlagged)
      return <i className="fa fa-flag" />;
    else if (this.props.isOpen && this.props.isMine)
      return <i className="fa fa-bomb" />;
    else if (this.props.isOpen && this.props.value > 0)
      return this.props.value;
    else
      return '';
  }

  onOpenCell() {
    this.props.onOpenCell(this.props.x, this.props.y);
  }

  onFlagCell(e) {
    e.preventDefault()
    this.props.onFlagCell(this.props.x, this.props.y);
  }

  render() {
    return (
      <td className={this.getClassName()}
          onClick={this.onOpenCell.bind(this)}
          onContextMenu={this.onFlagCell.bind(this)}>
        {this.getValue()}
      </td>
    );
  }
}
