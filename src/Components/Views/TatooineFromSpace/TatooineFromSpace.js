import React from 'react';
import bg from '@images/backgrounds/tatooine-from-space.png';
import './tatooine-from-space.css';

const TatooineDesert = React.forwardRef(function (props, ref) {
  return (
    <div ref={ref} className="tatooine-from-space">
      <img src={bg} />
    </div>
  );
});

export default TatooineDesert;
