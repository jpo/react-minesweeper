import React from 'react';

function Face({ status, onClick }) {
  const classNames = ['fa'];

  switch (status) {
    case 'playing':
      classNames.push('fa-meh-o');
      break;
    case 'won':
      classNames.push('fa-trophy')
      break;
    case 'lost':
      classNames.push('fa-frown-o');
      break;
    default:
      classNames.push('fa-smile-o');
  }

  return (
    <div className="face" onClick={onClick}>
      <i className={classNames.join(' ')} />
    </div>
  )
}

export default Face;
