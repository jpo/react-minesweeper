'use strict';

import React from 'react';

require('styles//Difficulty.css');

export default class Difficulty extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var beginnerClass     = this.props.difficulty === 1 ? 'active' : '';
    var intermediateClass = this.props.difficulty === 2 ? 'active' : '';
    var expertClass       = this.props.difficulty === 3 ? 'active' : '';

    return (
      <div className="difficulty">
        <button className={beginnerClass}
                onClick={this.props.beginner}>Beginner</button>
        <button className={intermediateClass}
                onClick={this.props.intermediate}>Intermediate</button>
        <button className={expertClass}
                onClick={this.props.expert}>Expert</button>
      </div>
    );
  }
}
