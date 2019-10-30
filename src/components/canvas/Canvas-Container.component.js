import React, { Component } from 'react';
import Canvas from './Canvas.component';
import './Canvas-Container.css'
import Guides from '../guides/Guides.component';
import rectData from '../../data/basic-case'

class CanvasContainer extends Component {

  constructor(){
    super();
    this.state = {
      rects: [...rectData.rects],
      selectionId: null,
      wrtRectId: null
    };
  }

  updateState(stateProperty, value){
    const newState = {...this.state};
    newState[stateProperty] = value;
    this.setState(newState);
  }

  updateRectData(rectIndex, rectDetail){
    const newRectState = [...this.state.rects];

    if(rectDetail.x<0 || rectDetail.y <0){
      console.warn("negatives"); //handle it later
      return;
    }

    newRectState[rectIndex] = rectDetail;
    this.updateState('rects', newRectState);
  }

  setSelectionId(newId){
    this.updateState('selectionId', newId);
  }

  setWrtRectId(newId){
    this.updateState('wrtRectId', newId);
  }
  
  render() { 

    console.log(this.state.selectionId);

    return ( <div 
              className = "cl-canvas-container">
                 <div
                  className="cl-canvas__transform">
                    <Guides 
                      rectData={[...this.state.rects]}
                      selectionId={this.state.selectionId}
                      setWrtRectId={this.setWrtRectId.bind(this)}
                       />

                    <Canvas 
                      rectData={[...this.state.rects]}
                      selectionId={this.state.selectionId}
                      wrtRectId={this.state.wrtRectId}
                      updateRectData={this.updateRectData.bind(this)}
                      setSelectionId={this.setSelectionId.bind(this)} />
                </div>
            </div> );
  }
}
 
export default CanvasContainer;   