export function getClosestMatchedRect(selectedRect, matchedRects, rowOrColumn){

  if(matchedRects.length)
  {
    // console.log(selectedRect, matchedRects);
    const selectedCenter = {
      x: (selectedRect.x + selectedRect.width) / 2,
      y: (selectedRect.y + selectedRect.height) / 2
    }

    let closestRowRect = null;
    let closestColumnRect = null;

    let closestRowRectDistance = Infinity;
    let closestColumnRectDistance = Infinity;

    if(matchedRects.length == 1){
      closestRowRect = matchedRects[0];
      closestColumnRect = matchedRects[1];
    }
    else{
    
      matchedRects.forEach(rect => {
    
        if(Math.abs(rect.x - selectedCenter.x) < closestRowRectDistance){
          closestRowRectDistance = Math.abs(rect.x - selectedCenter.x);
          closestRowRect = rect;
        }
        
        if(Math.abs((rect.x + rect.width) - selectedCenter.x) < closestRowRectDistance){
          closestRowRectDistance = Math.abs(rect.x - selectedCenter.x);
          closestRowRect = rect;
        }
        
        if(Math.abs(rect.y - selectedCenter.y) < closestColumnRectDistance){
          closestColumnRectDistance = Math.abs(rect.y - selectedCenter.y);
          closestColumnRect = rect;
        }
        
        if(Math.abs((rect.y + rect.width) - selectedCenter.y) < closestColumnRectDistance){
          closestColumnRectDistance = Math.abs(rect.y - selectedCenter.y);
          closestColumnRect = rect;
        }

      });
    }


    if(!rowOrColumn){
      return closestRowRectDistance < closestColumnRectDistance ? closestRowRect : closestColumnRect;
    }
    else if(rowOrColumn == "row"){
      return closestRowRect;
    } 
    else if(rowOrColumn == "column"){
      return closestColumnRect;
    } 
  }
}