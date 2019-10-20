import React from 'react';
import './Canvas.css'
import rectData from '../../data/basic-case'

const rects = rectData.rects;

function Canvas(){

  const rectDivs = rects.map((data, index)=>{
    const areaStyle = {
      gridArea: data.id,
      border: '1px solid black'
    }

    return (<div className="cl-rect" style={areaStyle} key={data.id}></div>);
    // return (null);
  })


   const rowDetails = rects.map(data => {
     return {
       id: data.id,
       start: data.y,
       end: data.y + data.height
     };
   })

   const columnDetails = rects.map(data => {
     return {
       id: data.id,
       start: data.x,
       end: data.x + data.width
     };
   })

  function getGridStyle(){
    return {
      grid: `${generatePartGridStyle(rowDetails)} / ${generatePartGridStyle(columnDetails)}`
    }
  }


  function partGridStyleListCompare(detail1, detail2) {
    return detail1.value - detail2.value;
  }

  function generatePartGridStyle(details){
    const partStyleDetailsList = []
    let partStyleString = '';
    const valueLineObject = {};

    details.forEach(detail => {
      partStyleDetailsList.push({id:detail.id, value: detail.start, start: true, end: false})
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

      partStyleString += value - prevValue + 'px' + ' '

      partStyleString += '[ '
      valueLineObject[value].start.forEach(startId =>{
        partStyleString += startId += '-start' +' ';
      })

      valueLineObject[value].end.forEach(endId => {
        partStyleString += endId += '-end' + ' ';
      })
      partStyleString += '] '


      prevValue = value;

    })

    console.log(partStyleString);

    return partStyleString;
    // return "100%";
  }


  return (
    <div className="cl-canvas" style={getGridStyle()}>{rectDivs}</div>
  )
}

export default Canvas;