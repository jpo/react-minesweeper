import React from 'react';

function Cell({ revealed, flagged, value, onClick, onRightClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    onRightClick();
  }

  let className = '';
  let output = '';

  if(revealed) {
    if (value === '*') {
      className = 'mine';
      output = <i className="fa fa-bomb"></i>;
    } else {
      className = 'revealed';
      output = value;
    }
  } else if (flagged) {
    className = 'flagged';
    output = <i className="fa fa-flag"></i>;
  } else {
    className = 'closed';
    output = '';
  }

  return (
    <div className={`cell ${className}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {output}
    </div>
  )
}

export default Cell;
