import React, { Component } from 'react';
import './Canvas.css'
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { getGridStyle } from './../../lib/gridUtils'
import Rect from '../rect/Rect.component'

class Canvas extends Component {

  state = {  }

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
  }


  getRectEls(){
    return this.props.rectData.map((data) => {
      const areaStyle = { gridArea: data.id }
      return (<Rect 
        isSelected ={data.id == this.state.selectionId}
        areaStyle = {areaStyle}
        id = {data.id}
        rectMouseDown = { this.rectMouseDown.bind(this) }
        key={data.id}
        position={{x:data.x, y:data.y}}
        /> );
    })
  }


  rectMouseDown(event, id) {
    console.log('down', id);
    event.stopPropagation();
    this.selectionId = id;
    this.rectsData = [...this.props.rectData];
    // this.setRectsData = setRects;

    this.movingRectIndex = this.props.rectData.findIndex(rect => rect.id === this.selectionId);

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
  }

  rectMouseMove(event) {
    // console.log("rectMM");
    const currentPosition = {x:event.clientX, y: event.clientY};

    const diff = {x: currentPosition.x - this.previousMousePosition.x, y: currentPosition.y - this.previousMousePosition.y};

    // this.diffPosition.x += diff.x;
    // this.diffPosition.y += diff.y;

    this.rectsData = [...this.props.rectData];

    // console.log(this.rectsData[this.movingRectIndex].x, this.rectsData[this.movingRectIndex].y)


    // this.rectsData[this.movingRectIndex].x += this.diffPosition.x;
    // this.rectsData[this.movingRectIndex].y += this.diffPosition.y;

    this.rectsData[this.movingRectIndex].x += diff.x;
    this.rectsData[this.movingRectIndex].y += diff.y;


    this.props.updateRectData(this.movingRectIndex,this.rectsData[this.movingRectIndex]);


    this.previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  }

  rectMouseUp(event) {
    // console.log('rectMU');
    console.log('up', this.selectionId);
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

    // this.props.updateRectData(this.movingRectIndex, this.rectsData[this.movingRectIndex]);

    this.rectsData = null;
    this.setRectsData = null;
    this.movingRectIndex = null;
  }


  render() { 
    const gridStyle = getGridStyle(this.props.rectData);

    // console.log(gridStyle);

    return ( < div
              className="cl-canvas" 
              style={gridStyle}>
                {this.getRectEls()}
              </div> );
  }
}
 
export default Canvas;