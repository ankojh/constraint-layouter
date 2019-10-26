import React, { Component } from 'react';
import Canvas from './Canvas.component';
import './Canvas-Container.css'
import rectData from '../../data/basic-case'

class CanvasContainer extends Component {
  state = { }

  constructor(){
    super();
    this.state = {rects: [...rectData.rects]};
  }


  updateState(stateProperty, value){
    const newState = {...this.state};
    newState[stateProperty] = value;
    this.setState(newState);
  }

  updateRectData(rectIndex, rectDetail){
    const newRectState = [...this.state.rects];

    if(rectDetail.x<0 || rectDetail.y <0){
      console.log("neg");
      return;
    }

    newRectState[rectIndex] = rectDetail;
    this.updateState('rects', newRectState);
  }

  addRectData(rectDetail){

  }

  removeRectData(rectDetail){
    
  }


  render() { 
    return ( < div className = "cl-canvas-container" >
                 <div className="cl-canvas__transform">
                   <Canvas rectData={this.state.rects} updateRectData={this.updateRectData.bind(this)}/>
                </div>
            </div> );
  }
}
 
export default CanvasContainer;   