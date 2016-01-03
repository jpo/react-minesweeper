'use strict';

import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clockId: 0,
      time: 0
    }
  }

  startClock() {
    var clockId = setInterval(this.clockTick.bind(this), 1000);
    this.setState({ clockId: clockId });
  }

  stopClock() {
    clearInterval(this.state.clockId);
    this.setState({ clockId: null });
  }

  resetClock() {
    clearInterval(this.state.clockId);
    this.setState({ time: 0, clockId: null });
  }

  clockTick() {
    this.setState({ time: ++this.state.time });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mode === nextProps.mode)
      return;

    switch (nextProps.mode) {
      case 'reset':
        this.resetClock();
        break;
      case 'off':
        this.stopClock();
        break;
      case 'on':
        this.startClock();
        break;
    }
  }

  render() {
    return (
      <div className="time">Time: {this.state.time}</div>
    )
  }
}
