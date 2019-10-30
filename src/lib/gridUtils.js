export function getRowDetails(rectRowData){
    return rectRowData.map(data => {
      return {
        id: data.id,
        start: data.y,
        end: data.y + data.height
      };
    })
  }

 export function getColumnDetails(rectColumnData){
    return rectColumnData.map(data => {
      return {
        id: data.id,
        start: data.x,
        end: data.x + data.width
      };
    })
  }

export function generatePartGridStyle(details, rOrC){
    const partStyleDetailsList = []
    let partStyleString = '';
    const valueLineObject = {};

    details.forEach(detail => {
      partStyleDetailsList.push({id:detail.id, value: detail.start, start: true, end: false})
      // partStyleDetailsList.push({id:detail.id, value: (detail.start+detail.end)/2, start: false, end: false})
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


    Object.keys(valueLineObject).sort((a,b)=>parseFloat(a) - parseFloat(b)).forEach(value=>{

  
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
    
    return partStyleString;
  }


  export function getGridStyle(rects) {
    return {
      grid: `${generatePartGridStyle(getRowDetails(rects),'row')} / ${generatePartGridStyle(getColumnDetails(rects),'col')}`
    }
  }