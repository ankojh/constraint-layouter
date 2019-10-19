import React from 'react';
import './Canvas.css'
import rectData from '../../data/basic-case'

const rects = rectData.rects;

function Canvas(){

  const rectDivs = rects.map((data, index)=>{
    // return (<div className="cl-rect" key={data.id}></div>);
    return (null);
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
    const partStyleString = '';
    const valueLineObject = {};

    details.forEach(detail => {
      partStyleDetailsList.push({id:detail.id, value: detail.start, start: true, end: false})
      partStyleDetailsList.push({id:detail.id, value: detail.end - detail.start, start: false, end: true})
    })

    console.log(details);

    // const sortedpartStyleDetailsList = partStyleDetailsList.sort(partGridStyleListCompare);

    partStyleDetailsList.forEach(detail => {
      if(!valueLineObject[detail.value]){
        valueLineObject[detail.value] = {start:[], end:[]};
      }

      if(detail.start){
        valueLineObject[detail.value].start.push(detail.id);
      }

      if(detail.end){
        valueLineObject[detail.value].end.push(detail.id);
      }
    })


    // console.log(valueLineObject);
    // console.log(partStyleDetailsList);


    // Object.keys(valueLineObject).sort().forEach((value, index)=>{
      // console.log(valueLineObject[value]);
      // partStyleString += []
    // })

    // console.log(partStyleDetailsList, partStyleString, valueLineObject);

    return '100%'
  }


  return (
    <div className="cl-canvas" style={getGridStyle()}>{rectDivs}</div>
  )
}

export default Canvas;