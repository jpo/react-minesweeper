import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clockId: 0,
      time: 0
    };
  }

  startClock() {
    var clockId = setInterval(this.clockTick.bind(this), 1000);
    this.setState({ clockId: clockId });
  }

  pauseClock() {
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
      case 'on':
        this.startClock();
        break;
      case 'off':
        this.resetClock();
        break;
      case 'paused':
        this.pauseClock();
        break;
      default:
        this.pauseClock();
        break;
    }
  }

  render() {
    return (
      <div className="clock">Time: {this.state.time}</div>
    );
  }
}

export default Clock;
