'use strict';

import React from 'react';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="counter">Mines: {this.props.count}</div>
    )
  }
}
