import {getRowDetails, getColumnDetails} from './gridUtils'

export function getRowGuides(rectData, selectionId, wrtRectId) {

  if(!selectionId){
    return [];
  }

  const rowData = getRowDetails(rectData);
  const rowGuides = getPartGuides(rowData, selectionId);
  // return rowGuides;
  
  return rowGuides.length ? [rowGuides[0]] : []

}

export function getColumnGuides(rectData, selectionId, wrtRectId) {
if (!selectionId) {
  return [];
}

  const columnData = getColumnDetails(rectData);
  const columnGuides = getPartGuides(columnData, selectionId);
  console.log(columnGuides);
  // return columnGuides;
  return columnGuides.length ? [columnGuides[0]] : []
}

function getPartGuides(partDetails, selectionId){

  const partDetailsLines = partDetails.map(detail => {return {id:detail.id, linePositions:[
    detail.start,
    (detail.start + detail.end) / 2,
    detail.end
  ]}})

  const selectedRectDetails = partDetailsLines.find(detail => detail.id == selectionId);

  const guides = [];

  partDetailsLines.forEach(detail => {
    if(detail.id == selectionId){
      return;
    }
    detail.linePositions.forEach(position=>{
      if(selectedRectDetails.linePositions.includes(position)){
        guides.push(position);
      }
    })
  })

  return guides;
}