'use strict';

import React from 'react';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var className = this.props.active ? 'active' : '';

    return (
      <button className={className}
              value={this.props.value}
              onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}
