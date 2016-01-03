'use strict';

import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clockId: 0,
      time: 0;
    }
  }

  isNewGame() {
    return this.props.status === 'init';
  }

  isPlaying() {
    return this.props.status === 'playing';
  }

  isGameOver() {
    return this.props.status === 'gameover';
  }

  isClockRunning() {
    return this.state.clockId > 0;
  }

  shouldRunClock() {
    if (this.isPlaying())
  }

  startClock() {
    var clockId = setInterval(this.clockTick, 1000);
    this.setState({ clockId: clockId });
  }

  stopClock() {
    clearInterval(this.state.clockId);
    this.setState({ clockId: 0 });
  }

  clockTick() {
    this.setState({ time: ++this.state.time });
  }

  componentDidMount() {
    if (isNewGame() && !this.isClockRunning())
      this.startClock();
    else if (this.isGameOver())
      this.stopClock();
  }

  render() {
    <div className="time">Time: {this.state.time}</div>
  }
}
