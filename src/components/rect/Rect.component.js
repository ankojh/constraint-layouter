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
        className={`cl-rect ${this.props.isSelected ? 'cl__selected' : '' }`} 
        style={this.props.areaStyle}>
        </div> );
  }
}
 
export default Rect; 