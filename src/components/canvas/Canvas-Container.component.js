import React, { Component } from 'react';
import Canvas from './Canvas.component';
import './Canvas-Container.css'
import Guides from '../guides/Guides.component';
import rectData from '../../data/basic-case'
import { fromEvent } from 'rxjs';

class CanvasContainer extends Component {

  keyStatus = null;

  keyMaps = {
    '8': 'Delete',
    '16': 'Shift',
    '81': 'Q',
    '88': 'X',
    '89': 'Y',
    '68': 'D',
    '65': 'A',
    '82': 'R'
  }

  containerMouseMoveSubscription = null;
  containerMouseUpSubscription = null;
  
  resizerMouseMoveSubscription = null;
  resizerMouseUpSubscription = null;
  resizerCurrentMousePosition = null;

  newRectId = null;
  isMouseDowned = false;
  resizingRect = null;

  idCounter = 1;
  

  constructor(){
    super();

    let rects = [...rectData.rects];


    if(localStorage.rects){
      rects = JSON.parse(localStorage.rects);
    }
    else{
      localStorage.rects = JSON.stringify(rects);
    }
    
    this.state = {
      rects: rects,
      selectionId: null,
      mouseDownRectId: null,
      wrtRectIdsIsSet: false,
      guidesStatus:{
        x: false,
        y: false
      },
      wrtRectIds: [],
      moveConstraints:{
        x: true,
        y: true
      },
      newRectMode: false,
      isResizing: false
    };

    this.idCounter = this.state.rects.length;

    this.canvas = React.createRef();
  }


  componentDidUpdate(){
    if(this.checkForKeyStatusChange()){
      this.handleKeyStatusChange();
    }
  
    localStorage.rects = JSON.stringify(this.state.rects);
  }

  handleKeyStatusChange(){
    this.keyStatus = this.props.keyStatus;

    if(!this.keyStatus){
      this.updateState({
        newRectMode: false,
        isResizing: false,
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
        !this.isMouseDowned && this.updateState({newRectMode: true});
        break;
      case 81:
        this.removeAll();
        break;
      case 88:
        this.updateState({moveConstraints: {x: true, y: false}});
        break;
      case 89:
        this.updateState({moveConstraints: {x: false, y: true}});
        break;
      case 68:
        this.duplicateRect();
         break;
      case 82:
        this.updateState({isResizing: true});
         break;
    } 
  }

  resizeHandler(mouseDownPosition, resizeType){
    this.resizingRect = this.state.rects.find(rect => rect.id == this.state.selectionId);

    this.resizerMouseMoveSubscription = fromEvent(document.body, "mousemove").subscribe(event => {
         this.resizerMoveHandler(event, mouseDownPosition, resizeType);
       })
   
    this.resizerMouseUpSubscription = fromEvent(document.body, "mouseup").subscribe(event => {
         this.resizerUpHandler();
       })

  }

  resizerMoveHandler(event, mouseDownPosition, resizerType) {
    const newRects = [...this.state.rects]; 

    if(!this.resizerCurrentMousePosition){
      this.resizerCurrentMousePosition = {...mouseDownPosition};
    }

    const diff = {x: event.clientX - this.resizerCurrentMousePosition.x, y: event.clientY - this.resizerCurrentMousePosition.y};
    const rect = newRects.find(rect => rect.id == this.state.selectionId);

    this.resizerCurrentMousePosition = {x: event.clientX, y:event.clientY};


    if(resizerType.includes("left")){
      rect.x += diff.x;
      rect.width -= diff.x;
    }
    if (resizerType.includes("top")) {
      rect.y += diff.y;
      rect.height -= diff.y;
    }
    if (resizerType.includes("right")) {
      rect.width += diff.x;
    }
    if (resizerType.includes("bottom")) {
      rect.height += diff.y;
    }
    
    this.updateState({rects: newRects});

  }

  resizerUpHandler(){
    this.resizerMouseMoveSubscription.unsubscribe();
    this.resizerMouseUpSubscription.unsubscribe();

    this.resizerMouseMoveSubscription = null;
    this.resizerMouseUpSubscription = null;

    this.resizerCurrentMousePosition = null;
  }


  removeAll(){
    this.updateState({rects: []});
  }

  duplicateRect(){
    if(!this.state.selectionId){
      return;
    }

    const rect = {...this.state.rects.find(rectData=>rectData.id == this.state.selectionId)};

    rect.x+=10;
    rect.y+=10;

    const rectId = this.addRect(rect);

    setTimeout(() => {
      this.updateState({selectionId: rectId});
    }, 1);
  }

  deleteHandler() {
    if(this.state.selectionId){
      this.deleteRect(this.state.selectionId);
    }
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
    newRectState[rectIndex] = rectDetail;


    if(rectDetail.x<0 || rectDetail.y <0){

      const xOffSet = rectDetail.x < 0 ? rectDetail.x : 0;
      const yOffSet = rectDetail.y < 0 ? rectDetail.y : 0;
      
      newRectState.forEach(data=>{
        data.x += (-xOffSet);
        data.y += (-yOffSet);
      })
    }
    this.updateState({rects:newRectState});
  }

  setWrtRectIds(newIds){
    this.updateState({wrtRectIds:newIds});
  }

  deleteRect(rectId){
    const rects =  [...this.state.rects];
    const index = rects.findIndex(rectDetail=>rectId == rectDetail.id)
    if(index>=0){
      rects.splice(index,1);
      this.updateState({rects})
    }
  }

  addRect(rectDetails){ //x,y,width,height
    const newRects = [...this.state.rects];
    const newRectId = 'el' + (++this.idCounter);
    
    rectDetails.id = newRectId;
    newRects.push(rectDetails);

    this.newRectId = newRectId;
    this.updateState({rects: newRects})
    return newRectId;
  }

  containerMouseDownHandler(event){
    this.isMouseDowned = true;
      if (event.target.classList.contains('cl-canvas') && this.state.newRectMode) {
        this.addRect({
          x: event.clientX,
          y: event.clientY,
          width: 1,
          height: 1
        })

        this.newAreaMouseDownPosition = {x: event.clientX,y: event.clientY}
      }

      if (this.containerMouseMoveSubscription) {
        this.containerMouseMoveSubscription.unsubscribe();
      }

      if (this.containerMouseUpSubscription) {
        this.containerMouseUpSubscription.unsubscribe();
      }

      this.containerMouseMoveSubscription = fromEvent(event.currentTarget, 'mousemove').subscribe(e => {
        this.containerMouseMoveHandler(e)
      })
      
      this.containerMouseUpSubscription = fromEvent(event.currentTarget, 'mouseup').subscribe(e => {
        this.containerMouseUpHandler(e)
      })
  }


  updateDataOfRect(rectId, newData){
    const newRects = [...this.state.rects];
    const updatingRect = newRects.find(rect=>rect.id == rectId);

    updatingRect.x = newData.x;
    updatingRect.y = newData.y;
    updatingRect.width = newData.width;
    updatingRect.height = newData.height;

    this.updateState({rects: newRects});
  }


  containerMouseMoveHandler(event){

    if(this.state.newRectMode){
      const dimensions = {
        x: event.clientX - this.newAreaMouseDownPosition.x,
        y: event.clientY - this.newAreaMouseDownPosition.y
      }


      const position = {
        x: dimensions.x < 0 ? this.newAreaMouseDownPosition.x + dimensions.x : this.newAreaMouseDownPosition.x,
        y: dimensions.y < 0 ? this.newAreaMouseDownPosition.y + dimensions.y : this.newAreaMouseDownPosition.y,
      }


      this.updateDataOfRect(this.newRectId, {
        x: position.x,
        y: position.y,
        width: Math.abs(dimensions.x) != 0 ? Math.abs(dimensions.x): 1,
        height: Math.abs(dimensions.y) != 0 ? Math.abs(dimensions.y) : 1,
      });
    }
  }

  containerMouseUpHandler(){
    this.isMouseDowned = false;
    this.newAreaMouseDownPosition = null;

    this.containerMouseMoveSubscription.unsubscribe();
    this.containerMouseUpSubscription.unsubscribe();

    this.containerMouseMoveSubscription = null;
    this.containerMouseUpSubscription = null;
    this.newRectId = null;
  }
  
  render() { 
    return ( <div 
              className = "cl-canvas-container"
              onMouseDown={this.containerMouseDownHandler.bind(this)}>
                 <div
                  className="cl-canvas__transform">
                    <Guides 
                      rectData={[...this.state.rects]}
                      wrtRectIds={this.state.wrtRectIds}
                      wrtRectIdsIsSet={this.state.wrtRectIdsIsSet}
                      setWrtRectIds={this.setWrtRectIds.bind(this)}
                      mouseDownRectId={this.state.mouseDownRectId}
                      updateState={this.updateState.bind(this)} 
                      guidesStatus={this.state.guidesStatus}
                       />

                    <Canvas 
                      ref={this.canvas}
                      rectData={[...this.state.rects]}
                      mouseDownRectId={this.state.mouseDownRectId}
                      selectionId={this.state.selectionId}
                      wrtRectIds={this.state.wrtRectIds}
                      updateRectData={this.updateRectData.bind(this)}
                      updateState={this.updateState.bind(this)} 
                      moveConstraints={this.state.moveConstraints}
                      guidesStatus={this.state.guidesStatus}
                      isResizing={this.state.isResizing}
                      resizeHandler={this.resizeHandler.bind(this)}
                       />
                </div>
            </div> );
  }
}
 
export default CanvasContainer;   