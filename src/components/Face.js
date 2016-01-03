'use strict';

import React from 'react';

export default class Face extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var icon = this.props.status === 'winner'   ? 'fa fa-thumbs-o-up' :
               this.props.status === 'gameover' ? 'fa fa-frown-o'     :
                                                  'fa fa-smile-o';

    return (
      <div className="face" onClick={this.props.onClick}>
        <i className={icon} />
      </div>
    )
  }
}
