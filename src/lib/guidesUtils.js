import {getRowDetails, getColumnDetails} from './gridUtils'
import { getRectsCloserToMatchedRects } from './rectUtils';

export function getRowGuides(rectData, selectionRect, wrtRectId="el4") {

  if (!selectionRect) {
    return [];
  }

  const rowData = getRowDetails(rectData);
  const rowGuides = getPartGuides(rowData, selectionRect.id);
  
  return getBestGuides(rectData, selectionRect, wrtRectId, rowGuides);
}


export function getColumnGuides(rectData, selectionRect, wrtRectId="el4") {

  if (!selectionRect) {
    return [];
  }

  const columnData = getColumnDetails(rectData);
  const columnGuides = getPartGuides(columnData, selectionRect.id);

  return getBestGuides(rectData, selectionRect, wrtRectId, columnGuides);
}


function getBestGuides(rectData, selectionRect, wrtRectId, partGuides){
  if (!wrtRectId) {
    const matchedGuidesRect = partGuides.map(guideData => rectData.find(rd => rd.id == guideData.id));
    const closestRect = getRectsCloserToMatchedRects(selectionRect, matchedGuidesRect);
    wrtRectId = closestRect.id;
  }

  const guidesWrtRect = partGuides.filter(partGuideData => partGuideData.id == wrtRectId);

  return guidesWrtRect.length ? [guidesWrtRect[0]] : []
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