import React, { Component } from 'react';
import './Rect.css'

class Rect extends Component {
  
  state = {  }

  constructor(){
    super();

  }

  render() { 
    return ( <div 
        onMouseDown={event=>{this.props.rectMouseDown(event, this.props.id)}}
        className={`cl-rect ${this.props.isSelected ? 'cl__selected' : '' } ${this.props.isMouseDowned ? 'cl__selected' : '' } ${this.props.isWrtRect ? 'cl__wrt' : '' }`} 
        style={this.props.areaStyle}>
          {/* <div className="cl-rect-helper cl-helper-x"></div> */}
          {/* <div className="cl-rect-helper cl-helper-y"></div> */}
          <div className='cl-rectname'>
            <span>{this.props.name}</span>
          </div>
        </div> );
  }
}
 
export default Rect; 