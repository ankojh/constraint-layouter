import React, { useState } from 'react';
import './Canvas.css'
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import rectData from '../../data/basic-case'

function Canvas(){

  const [state, setState] = useState({
    rectData: rectData.rects
  })

  const [selectedRectId, setSelectedRectId] = useState('')

  let mouseMoveSubscrition = null;
  let mouseUpSubscrition = null;

  function getRowDetails(){
    return state.rectData.map(data => {
      return {
        id: data.id,
        start: data.y,
        end: data.y + data.height
      };
    })
  }

  function getColumnDetails(){
    return state.rectData.map(data => {
      return {
        id: data.id,
        start: data.x,
        end: data.x + data.width
      };
    })
  }

  function getRectEls(){
    return state.rectData.map(data=>{
      const areaStyle = { gridArea: data.id }
      return (<div 
        className={`cl-rect ${data.id === selectedRectId ? 'cl__selected': ''}`} 
        style={areaStyle} 
        key={data.id}
        onMouseDown={(event)=>{rectMouseDown(event,data.id)}}>
        </div>);
    })
  }

  function rectMouseDown(event, rectId){
    event.stopPropagation(); // for unselection not to happeen
    setSelectedRectId(rectId);
    
    if (mouseMoveSubscrition)
      mouseMoveSubscrition.unsubscribe();
  
    if (mouseUpSubscrition)
    mouseUpSubscrition.unsubscribe();
  
    mouseMoveSubscrition = fromEvent(document.body, 'mousemove').pipe(throttleTime(16)).subscribe(e => {
      rectMouseMove(e)
    });
    mouseUpSubscrition = fromEvent(document.body, 'mouseup').pipe(throttleTime(16)).subscribe(e => {
      rectMouseUp(e)
    });
  }

  function rectMouseMove(event){
    console.log('mousemove')
  }

  function rectMouseUp(){
    console.log('mouseup')
    mouseMoveSubscrition.unsubscribe();
    mouseUpSubscrition.unsubscribe();
  }


  function getGridStyle(){
    return {
      grid: `${generatePartGridStyle(getRowDetails())} / ${generatePartGridStyle(getColumnDetails())}`
    }
  }


  function generatePartGridStyle(details){
    const partStyleDetailsList = []
    let partStyleString = '';
    const valueLineObject = {};

    details.forEach(detail => {
      partStyleDetailsList.push({id:detail.id, value: detail.start, start: true, end: false})
      partStyleDetailsList.push({id:detail.id, value: (detail.start+detail.end)/2, start: false, end: false})
      partStyleDetailsList.push({id:detail.id, value: detail.end, start: false, end: true})
    })

    partStyleDetailsList.forEach(detail=>{
      if(!valueLineObject[detail.value]){
        valueLineObject[detail.value] = {start:[], end:[]}
      }

      if(detail.start){
        valueLineObject[detail.value].start.push(detail.id);
      }
      else if(detail.end){
        valueLineObject[detail.value].end.push(detail.id);
      }
    });

    

    partStyleString = ''
    let prevValue = 0;

    Object.keys(valueLineObject).sort().forEach((value, index)=>{

      partStyleString += `${value - prevValue}px `

      partStyleString += '[ '
      valueLineObject[value].start.forEach(startId =>{
        partStyleString += `${startId}-start `;
      })

      valueLineObject[value].end.forEach(endId => {
        partStyleString += `${endId}-end `;
      })
      partStyleString += '] '


      prevValue = value;

    })

    // console.log(partStyleString);

    return partStyleString;
  }


  return (
    <div 
      className="cl-canvas" 
      style={getGridStyle()}
      onMouseDown={()=>{if(selectedRectId !== ''){setSelectedRectId('')}}}
      >
        {getRectEls()}
      </div>
  )
}

export default Canvas;