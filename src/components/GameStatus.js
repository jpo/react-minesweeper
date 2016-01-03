'use strict';

import React from 'react';

require('styles//GameStatus.css');

export default class GameStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var status = this.props.status === 'gameover' ?
                   'fa fa-frown-o' : 'fa fa-smile-o';

    return (
      <div className="game-status clearfix">
        <div className="time">
          Time: {this.props.time}
        </div>
        <div className="smiley" onClick={this.props.resetGame}>
          <i className={status} />
        </div>
        <div className="mines">
          Mines: {this.props.mines}
        </div>
      </div>
    );
  }
}
