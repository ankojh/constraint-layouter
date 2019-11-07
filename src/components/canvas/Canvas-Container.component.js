import React, { Component } from 'react';
import Canvas from './Canvas.component';
import './Canvas-Container.css'
import Guides from '../guides/Guides.component';
import rectData from '../../data/basic-case'

class CanvasContainer extends Component {

  keyStatus = null;

  keyMaps = {
    '8': 'Delete',
    '16': 'Shift',
    '88': 'X',
    '89': 'Y'
  }

  constructor(){
    super();
    this.state = {
      rects: [...rectData.rects],
      selectionId: null,
      mouseDownRectId: null,
      wrtRectIdsIsSet: false,
      wrtRectIds: [],
      moveConstraints:{
        x: true,
        y: true
      },
      newRectMode: false
    };
  }

  componentDidUpdate(){
    if(this.checkForKeyStatusChange()){
      this.handleKeyStatusChange();
    }
  }

  handleKeyStatusChange(){
    this.keyStatus = this.props.keyStatus;

    if(!this.keyStatus){
      this.updateState({
        newRectMode: true,
        moveConstraints: {
          x: true,
          y: true
        }
      })

      return;
    }

    switch (this.keyStatus) {
      case 8:
        this.deleteHandler();
        break;
      case 16: 
        this.updateState({newRectMode: true})
        break;
      case 88:
        this.updateState({moveConstraints: {x: true, y: false}});
        break;
      case 89:
        this.updateState({moveConstraints: {x: false, y: true}});
        break;
    }

    // delete 8
    // shift 16
    // x 88
    // y 89

  }


  deleteHandler(){

  }


  checkForKeyStatusChange(){
    return this.keyStatus != this.props.keyStatus;
  }

  updateState(partialState){
    const newState = {...this.state};
    Object.keys(partialState).forEach(key=>{
      newState[key] = partialState[key];
    })

    this.setState(newState);
  }

  updateRectData(rectIndex, rectDetail){
    const newRectState = [...this.state.rects];

    if(rectDetail.x<0 || rectDetail.y <0){
      console.warn("negatives"); //handle it later
      return;
    }

    newRectState[rectIndex] = rectDetail;
    this.updateState({rects:newRectState});
  }

  setWrtRectIds(newIds){
    this.updateState({wrtRectIds:newIds});
  }

  addRect(){

  }

  deleteRect(rectId){
    const rects =  [...this.state.rects];
    const index = rects.findIndex(rectDetail=>rectId == rectDetail.id)
    if(index>=0){
      rects.splice(index,1);
      this.updateState({rects})
    }
  }
  
  render() { 
    return ( <div 
              className = "cl-canvas-container">
                 <div
                  className="cl-canvas__transform">
                    <Guides 
                      rectData={[...this.state.rects]}
                      wrtRectIds={this.state.wrtRectIds}
                      wrtRectIdsIsSet={this.state.wrtRectIdsIsSet}
                      setWrtRectIds={this.setWrtRectIds.bind(this)}
                      mouseDownRectId={this.state.mouseDownRectId}
                      updateState={this.updateState.bind(this)} 
                       />

                    <Canvas 
                      rectData={[...this.state.rects]}
                      mouseDownRectId={this.state.mouseDownRectId}
                      selectionId={this.state.selectionId}
                      wrtRectIds={this.state.wrtRectIds}
                      updateRectData={this.updateRectData.bind(this)}
                      updateState={this.updateState.bind(this)} 
                      moveConstraints={this.state.moveConstraints}
                       />
                </div>
            </div> );
  }
}
 
export default CanvasContainer;   