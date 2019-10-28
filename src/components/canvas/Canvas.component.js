import React, { Component } from 'react';
import './Canvas.css'
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { getGridStyle } from './../../lib/gridUtils'
import Rect from '../rect/Rect.component'
import rectData from '../../data/basic-case'

class Canvas extends Component {

  selectionId = null;
  mouseMoveSubscription = null;
  mouseUpSubscription = null;
  mouseDownPosition = {x: null, y: null};
  previousMousePosition = {x: null, y: null};

  rectsData = null; 
  setRectsData = null; 

  movingRectIndex = null;

  diffPosition = {x:0, y:0};


  constructor(){
    super();
    this.state = {
      rects: [...rectData.rects],
      selectionId: null
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

  getRectEls(){
    return this.state.rects.map((data) => {
      const areaStyle = { gridArea: data.id }
      return (<Rect 
        isSelected ={data.id == this.state.selectionId}
        areaStyle = {areaStyle}
        id = {data.id}
        rectMouseDown = { this.rectMouseDown.bind(this) }
        key={data.id}
        /> );
    })
  }


  rectMouseDown(event, id) {
    event.stopPropagation();
    this.rectsData = [...this.state.rects];

    this.movingRectIndex = this.state.rects.findIndex(rect => rect.id === id);

    if(this.mouseMoveSubscription){
      this.mouseMoveSubscription.unsubscribe();
    }

    if (this.mouseUpSubscription) {
      this.mouseUpSubscription.unsubscribe();
    }

    this.mouseMoveSubscription = fromEvent(document.body, 'mousemove').pipe(throttleTime(16)).subscribe(e => {
      this.rectMouseMove(e)
    });

    this.mouseUpSubscription = fromEvent(document.body, 'mouseup').pipe(throttleTime(16)).subscribe(e => {
      this.rectMouseUp(e)
    });

    this.mouseDownPosition = {
      x: event.clientX,
      y: event.clientY
    };

    this.previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    };

    this.updateState('selectionId', id);
  }

  rectMouseMove(event) {
    const currentPosition = {x:event.clientX, y: event.clientY};

    const diff = {x: currentPosition.x - this.previousMousePosition.x, y: currentPosition.y - this.previousMousePosition.y};

    this.rectsData = [...this.state.rects];

    this.rectsData[this.movingRectIndex].x += diff.x;
    this.rectsData[this.movingRectIndex].y += diff.y;

    this.updateRectData(this.movingRectIndex,this.rectsData[this.movingRectIndex]);


    this.previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  }

  rectMouseUp(event) {
    this.mouseMoveSubscription.unsubscribe();
    this.mouseUpSubscription.unsubscribe();
    this.mouseDownPosition = {
      x: null,
      y: null
    };
    this.previousMousePosition = {
      x: null,
      y: null
    };

    this.rectsData = [...this.state.rects];

    this.rectsData[this.movingRectIndex].x += this.diffPosition.x;
    this.rectsData[this.movingRectIndex].y += this.diffPosition.y;

    this.rectsData = null;
    this.setRectsData = null;
    this.movingRectIndex = null;
  }

  canvasMouseDowned(event){
    this.updateState('selectionId', null);
  }


  render() { 
    const gridStyle = getGridStyle(this.state.rects);
    return ( < div
              className="cl-canvas" 
              onMouseDown={e=>{this.canvasMouseDowned(e)}}
              style={gridStyle}>
                {this.getRectEls()}
              </div> );
  }
}
 
export default Canvas;