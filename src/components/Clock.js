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
    if (this.props.status === nextProps.status)
      return;

    switch (nextProps.status) {
      case 'new':
        this.resetClock();
        break;
      case 'playing':
        this.startClock();
        break;
      case 'winner':
      case 'loser':
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
