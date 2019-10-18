import React from 'react';
import './Toolbar.css';

function Toolbar(){
  return (
    <div className="cl-toolbar">
      <div className="cl__title">Constraint Layouter</div>
      <div className="cl__menus">
        <button>Rect</button>
      </div>
    </div>
  )
}

export default Toolbar;