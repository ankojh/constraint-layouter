import React, { useEffect} from 'react';
import Canvas from './Canvas.component';
import './Canvas-Container.css'
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

function CanvasContainer(){

  let selectionId = null;
  let mouseMoveSubscription = null;
  let mouseUpSubscription = null;
  let mouseDownPosition = {x: null, y: null};
  let previousMousePosition = {x: null, y: null};

  let rectsData = null; 
  let setRectsData = null; 

  let movingRectIndex = null;

  let diffPosition = {x:0, y:0};

  function rectMouseDown(event, id, rects, setRects){
    selectionId = id;
    rectsData = [...rects];
    setRectsData = setRects;

    movingRectIndex = rectsData.findIndex(rect => rect.id === selectionId);

    if(mouseMoveSubscription){
      mouseMoveSubscription.unsubscribe();
    }
    
    if (mouseUpSubscription) {
      mouseUpSubscription.unsubscribe();
    }

    mouseMoveSubscription = fromEvent(document.body, 'mousemove').pipe(throttleTime(160)).subscribe(e => {
      rectMouseMove(e)
    });

    mouseUpSubscription = fromEvent(document.body, 'mouseup').pipe(throttleTime(160)).subscribe(e => {
      rectMouseUp(e)
    });

    mouseDownPosition = {x:event.clientX, y: event.clientY};
    previousMousePosition = {x:event.clientX, y: event.clientY};
  }

  function rectMouseMove(event){
    console.log('move', selectionId);
    const currentPosition = {x:event.clientX, y: event.clientY};

    const diff = {x: currentPosition.x - previousMousePosition.x, y: currentPosition.y - previousMousePosition.y};
    
    diffPosition.x += diff.x;
    diffPosition.y += diff.y;

    // rectsData[movingRectIndex].x += diff.x;
    // rectsData[movingRectIndex].y += diff.y;

    // setRectsData(rectsData);

    previousMousePosition = {x:event.clientX, y: event.clientY};
  }

  function rectMouseUp(event){
    console.log('up', selectionId);
    mouseMoveSubscription.unsubscribe();
    mouseUpSubscription.unsubscribe();
    mouseDownPosition = {x: null, y: null};
    previousMousePosition = {x: null, y: null};

    rectsData[movingRectIndex].x += diffPosition.x;
    rectsData[movingRectIndex].y += diffPosition.y;

    setRectsData(rectsData);

    rectsData = null;
    setRectsData = null;
    movingRectIndex = null;
  }

  return (
    <div className="cl-canvas-container">
        <div className="cl-canvas__transform">
          <Canvas
            onMouseDown={rectMouseDown}
            onMouseMove={rectMouseMove}
            onMouseUp={rectMouseUp}
          />
        </div>
    </div>
  )
}

export default CanvasContainer;