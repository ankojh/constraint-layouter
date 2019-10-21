import React, { useState, useEffect } from 'react';
import './Canvas.css'
import { fromEvent } from 'rxjs';
import rectData from '../../data/basic-case'
import { getGridStyle } from './../../lib/gridUtils'

let gRD = rectData;

function Canvas(props){

  const [rects, setRects] = useState(gRD.rects);
  const [selectionId, setSelectionId] = useState(null);
  
  useEffect(()=>{
    console.log(JSON.stringify(rects));
  })

  function rectMouseDown(event, id){
    event.stopPropagation();
    props.onMouseDown(event, id, rects, setRects);
  }

  function canvasMouseDown(){
    setSelectionId('');
  }

  function getRectEls(){
    return rects.map(({id}) => {
      const areaStyle = { gridArea: id }
      return (<div 
        onMouseDown={event=>{rectMouseDown(event, id)}}
        className={`cl-rect ${selectionId === id ? 'cl__selected' : '' }`} 
        style={areaStyle} 
        key={id}>
        </div>);
    })
  } 

  return (
    <div 
      className="cl-canvas" 
      onMouseDown={event=>{canvasMouseDown(event)}}
      style={getGridStyle(rects)}>
        {getRectEls()}
      </div>
  )
}

export default Canvas;