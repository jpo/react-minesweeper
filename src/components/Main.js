require('normalize.css');
require('styles/App.css');

import React from 'react';
import Minesweeper from './Minesweeper'

export default class AppComponent extends React.Component {
  render() {
    return (
      <Minesweeper/>
    );
  }
}
