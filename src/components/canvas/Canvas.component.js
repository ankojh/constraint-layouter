import React, { Component } from 'react';
import './Canvas.css'
import { fromEvent } from 'rxjs';
import rectData from '../../data/basic-case'
import { getGridStyle } from './../../lib/gridUtils'

let gRD = rectData;

class Canvas extends Component {

  state = {  }

  constructor(){
    super();

    this.state = {
      rects: gRD.rects,
      selectionId: ''
    }
  }

  rectMouseDown(event, id){
    event.stopPropagation();
    this.props.onMouseDown(event, id, this.state.rects, this.setState);
  }

  canvasMouseDown(){
    this.setState({...this.state, selectionId: ''});
  }

  getRectEls(){
    return this.state.rects.map(({id}) => {
      const areaStyle = { gridArea: id }
      return (<div 
        onMouseDown={event=>{this.rectMouseDown(event, id)}}
        className={`cl-rect ${this.state.selectionId === id ? 'cl__selected' : '' }`} 
        style={areaStyle} 
        key={id}>
        </div>);
    })
  } 

  render() { 
    return ( < div
              className="cl-canvas" 
              onMouseDown={event=>{this.canvasMouseDown(event)}}
              style={getGridStyle(this.state.rects)}>
                {this.getRectEls()}
              </div> );
  }
}
 
export default Canvas;

// function Canvas(props){

//   const [rects, setRects] = useState(gRD.rects);
//   const [selectionId, setSelectionId] = useState(null);
  
//   function rectMouseDown(event, id){
//     event.stopPropagation();
//     props.onMouseDown(event, id, rects, setRects);
//   }

//   function canvasMouseDown(){
//     setSelectionId('');
//   }

//   function getRectEls(){
//     return rects.map(({id}) => {
//       const areaStyle = { gridArea: id }
//       return (<div 
//         onMouseDown={event=>{rectMouseDown(event, id)}}
//         className={`cl-rect ${selectionId === id ? 'cl__selected' : '' }`} 
//         style={areaStyle} 
//         key={id}>
//         </div>);
//     })
//   } 

//   return (
//     <div 
//       className="cl-canvas" 
//       onMouseDown={event=>{canvasMouseDown(event)}}
//       style={getGridStyle(rects)}>
//         {getRectEls()}
//       </div>
//   )
// }

// export default Canvas;