import React, { Component } from 'react';
import Canvas from './Canvas.component';
import './Canvas-Container.css'

class CanvasContainer extends Component {
  state = { }

  constructor(){
    super();
    
  }
  
  render() { 
    return ( <div 
              className = "cl-canvas-container">
                 <div
                  className="cl-canvas__transform">
                   <Canvas />
                </div>
            </div> );
  }
}
 
export default CanvasContainer;   