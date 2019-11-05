import React, { Component } from 'react';
import './Canvas.css'
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { getGridStyle } from './../../lib/gridUtils'
import Rect from '../rect/Rect.component'

class Canvas extends Component {

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
  }

  getRectEls(){
    return this.props.rectData.map((data) => {
      const areaStyle = { gridArea: data.id }
      return (<Rect 
        isSelected ={data.id == this.props.selectionId}
        isMouseDowned ={data.id == this.props.mouseDownRectId}
        isWrtRect = {this.props.wrtRectIds.includes(data.id)}
        areaStyle = {areaStyle}
        id = {data.id}
        rectMouseDown = { this.rectMouseDown.bind(this) }
        key={data.id}
        /> );
    })
  }


  rectMouseDown(event, id) {
    event.stopPropagation();
    this.rectsData = [...this.props.rectData];

    this.movingRectIndex = this.props.rectData.findIndex(rect => rect.id === id);

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

    this.props.updateState({selectionId:id,mouseDownRectId: id});
    
  }

  rectMouseMove(event) {
    const currentPosition = {x:event.clientX, y: event.clientY};

    const diff = {x: currentPosition.x - this.previousMousePosition.x, y: currentPosition.y - this.previousMousePosition.y};

    this.rectsData = [...this.props.rectData];

    this.rectsData[this.movingRectIndex].x += diff.x;
    this.rectsData[this.movingRectIndex].y += diff.y;

    this.props.updateRectData(this.movingRectIndex,this.rectsData[this.movingRectIndex]);


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

    this.rectsData = [...this.props.rectData];

    this.rectsData[this.movingRectIndex].x += this.diffPosition.x;
    this.rectsData[this.movingRectIndex].y += this.diffPosition.y;



    this.rectsData = null;
    this.setRectsData = null;
    this.movingRectIndex = null;
    this.props.setMouseDownRectId(null);
    // update the state on mouse up.
  }

  canvasMouseDowned(event){
    this.props.setSelectionId(null);
  }


  render() { 
    const gridStyle = getGridStyle(this.props.rectData);
    return ( 
            <div
              className="cl-canvas"   //canvas is grid
              onMouseDown={e=>{this.canvasMouseDowned(e)}}
              style={gridStyle}>
                {this.getRectEls()}
              </div> );
  }
}
 
export default Canvas;