'use strict';

import React from 'react';

require('styles//Difficulty.css');

export default class Difficulty extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var beginnerClass     = this.props.difficulty === 0 ? 'active' : '';
    var intermediateClass = this.props.difficulty === 1 ? 'active' : '';
    var expertClass       = this.props.difficulty === 2 ? 'active' : '';

    return (
      <div className="difficulty">
        <button className={beginnerClass}
                onClick={this.props.onBeginner}>Beginner</button>
        <button className={intermediateClass}
                onClick={this.props.onIntermediate}>Intermediate</button>
        <button className={expertClass}
                onClick={this.props.onExpert}>Expert</button>
      </div>
    );
  }
}
