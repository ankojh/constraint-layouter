import {getRowDetails, getColumnDetails} from './gridUtils'
import { getClosestMatchedRect } from './rectUtils';

export function getRowGuides(rectData, selectionRect, wrtRectIds) {

  if (!selectionRect) {
    return {guides: [], wrtRectIds};
  }

  const rowData = getRowDetails(rectData);
  const rowGuides = getPartGuides(rowData, selectionRect.id);
  
  return getBestGuides(rectData, selectionRect, wrtRectIds, rowGuides, 'column'); // column wise closest
}


export function getColumnGuides(rectData, selectionRect, wrtRectIds) {

  if (!selectionRect) {
    return {guides: [], wrtRectIds};
  }

  const columnData = getColumnDetails(rectData);
  const columnGuides = getPartGuides(columnData, selectionRect.id);

  return getBestGuides(rectData, selectionRect, wrtRectIds, columnGuides, 'row'); // row wise closest
}


function getBestGuides(rectData, selectionRect, wrtRectIds, partGuides, rowOrColumn){
  if (!wrtRectIds.length) {
    const matchedGuidesRect = partGuides.map(guideData => rectData.find(rd => rd.id == guideData.id));
    const closestRect = getClosestMatchedRect(selectionRect, matchedGuidesRect, rowOrColumn);
    wrtRectIds = closestRect ? [closestRect.id] : [];
  }

  const guidesWrtRect = partGuides.filter(partGuideData => wrtRectIds.includes(partGuideData.id));

  // console.log(guidesWrtRect);

  return guidesWrtRect.length ? {guides:[guidesWrtRect[0]], wrtRectIds} : {guides:[], wrtRectIds}
  // return guidesWrtRect.length ? {guides:guidesWrtRect, wrtRectIds} : {guides:[], wrtRectIds}
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
        guides.push({id: detail.id, position});
      }
    })
  })

  return guides;
}