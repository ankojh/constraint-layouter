export function getClosestMatchedRect(selectedRect, matchedRects, rowOrColumn){

  if(matchedRects.length)
  {
    // console.log(selectedRect, matchedRects);
    const selectedCenter = {
      x: selectedRect.x + selectedRect.width / 2,
      y: selectedRect.y + selectedRect.height / 2
    }

    let closestRowRect = null;
    let closestColumnRect = null;

    let closestRowRectDistance = Infinity;
    let closestColumnRectDistance = Infinity;

    if(matchedRects.length == 1){
      closestRowRect = matchedRects[0];
      closestColumnRect = matchedRects[0];
    }
    else{
      
      matchedRects.forEach(rect => {


        if(Math.abs(rect.x - selectedCenter.x) < closestColumnRectDistance){
          // console.log('c1');
          closestColumnRectDistance = Math.abs(rect.x - selectedCenter.x);
          closestColumnRect = rect;
        }
        
        if(Math.abs((rect.x + rect.width) - selectedCenter.x) < closestColumnRectDistance){
          // console.log('c2');
          closestColumnRectDistance = Math.abs((rect.x + rect.width) - selectedCenter.x);
          closestColumnRect = rect;
        }
        
        if(Math.abs(rect.y - selectedCenter.y) < closestRowRectDistance){
          // console.log('c3');
          closestRowRectDistance = Math.abs(rect.y - selectedCenter.y);
          closestRowRect = rect;
        }
        
        if(Math.abs((rect.y + rect.width) - selectedCenter.y) < closestRowRectDistance){
          // console.log('c4')
          closestRowRectDistance = Math.abs((rect.y + rect.width) - selectedCenter.y)
          closestRowRect = rect;
        }

        // console.log(rect.id, Math.abs(rect.x - selectedCenter.x), Math.abs((rect.x + rect.width) - selectedCenter.x), closestColumnRectDistance, closestColumnRect.id)


      });

      // console.log(closestColumnRect.id, closestColumnRectDistance, rowOrColumn);

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