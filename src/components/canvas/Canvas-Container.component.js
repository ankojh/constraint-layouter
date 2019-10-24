import React, { Component } from 'react';
import Canvas from './Canvas.component';
import './Canvas-Container.css'
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

class CanvasContainer extends Component {
  state = { }

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

   rectMouseDown(event, id, rects, setRects) {
        this.selectionId = id;
        this.rectsData = [...rects];
        this.setRectsData = setRects;

        this.movingRectIndex = this.rectsData.findIndex(rect => rect.id === this.selectionId);

        if(this.mouseMoveSubscription){
          this.mouseMoveSubscription.unsubscribe();
        }

        if (this.mouseUpSubscription) {
          this.mouseUpSubscription.unsubscribe();
        }

        this.mouseMoveSubscription = fromEvent(document.body, 'mousemove').pipe(throttleTime(160)).subscribe(e => {
          this.rectMouseMove(e)
        });

        this.mouseUpSubscription = fromEvent(document.body, 'mouseup').pipe(throttleTime(160)).subscribe(e => {
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

       rectMouseMove(event){
        console.log('move', this.selectionId);
        const currentPosition = {x:event.clientX, y: event.clientY};

        const diff = {x: currentPosition.x - this.previousMousePosition.x, y: currentPosition.y - this.previousMousePosition.y};

        this.diffPosition.x += diff.x;
        this.diffPosition.y += diff.y;

        this.previousMousePosition = {
          x: event.clientX,
          y: event.clientY
        };
      }

       rectMouseUp(event){
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

        this.rectsData[this.movingRectIndex].x += this.diffPosition.x;
        this.rectsData[this.movingRectIndex].y += this.diffPosition.y;

        this.setRectsData(this.rectsData);

        this.rectsData = null;
        this.setRectsData = null;
        this.movingRectIndex = null;
      }



  render() { 
    return ( < div className = "cl-canvas-container" >
                 <div className="cl-canvas__transform">
                   <Canvas
                    onMouseDown={this.rectMouseDown.bind(this)}
                    onMouseMove={this.rectMouseMove.bind(this)}
                    onMouseUp={this.rectMouseUp.bind(this)}
                  />
                </div>
            </div> );
  }
}
 
export default CanvasContainer;   


// function CanvasContainer(){

//   let selectionId = null;
//   let mouseMoveSubscription = null;
//   let mouseUpSubscription = null;
//   let mouseDownPosition = {x: null, y: null};
//   let previousMousePosition = {x: null, y: null};

//   let rectsData = null; 
//   let setRectsData = null; 

//   let movingRectIndex = null;

//   let diffPosition = {x:0, y:0};

//   function this.bind(this.rectMouseDown(event), id, rects, setRects){
//     selectithis.onId = i.bind(thisd);
//     this.rectsData = [...rects].bin)d(this;
//     setRectsData = setRects;

//     movingRectIndex = rectsData.findIndex(rect => rect.id === selectionId);

//     if(mouseMoveSubscription){
//       mouseMoveSubscription.unsubscribe();
//     }
    
//     if (mouseUpSubscription) {
//       mouseUpSubscription.unsubscribe();
//     }

//     mouseMoveSubscription = fromEvent(document.body, 'mousemove').pipe(throttleTime(160)).subscribe(e => {
//       rectMouseMove(e)
//     });

//     mouseUpSubscription = fromEvent(document.body, 'mouseup').pipe(throttleTime(160)).subscribe(e => {
//       rectMouseUp(e)
//     });

//     mouseDownPosition = {x:event.clientX, y: event.clientY};
//     previousMousePosition = {x:event.clientX, y: event.clientY};
//   }

//   function rectMouseMove(event){
//     console.log('move', selectionId);
//     const currentPosition = {x:event.clientX, y: event.clientY};

//     const diff = {x: currentPosition.x - previousMousePosition.x, y: currentPosition.y - previousMousePosition.y};
    
//     diffPosition.x += diff.x;
//     diffPosition.y += diff.y;

//     // rectsData[movingRectIndex].x += diff.x;
//     // rectsData[movingRectIndex].y += diff.y;

//     // setRectsData(rectsData);

//     previousMousePosition = {x:event.clientX, y: event.clientY};
//   }

//   function rectMouseUp(event){
//     console.log('up', selectionId);
//     mouseMoveSubscription.unsubscribe();
//     mouseUpSubscription.unsubscribe();
//     mouseDownPosition = {x: null, y: null};
//     previousMousePosition = {x: null, y: null};

//     rectsData[movingRectIndex].x += diffPosition.x;
//     rectsData[movingRectIndex].y += diffPosition.y;

//     setRectsData(rectsData);

//     rectsData = null;
//     setRectsData = null;
//     movingRectIndex = null;
//   }

//   return (
//     <div className="cl-canvas-container">
//         <div className="cl-canvas__transform">
//           <Canvas
//             onMouseDown={rectMouseDown}
//             onMouseMove={rectMouseMove}
//             onMouseUp={rectMouseUp}
//           />
//         </div>
//     </div>
//   )
// }

// export default CanvasContainer;