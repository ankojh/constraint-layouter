import * as React from 'react';
import { Component } from 'react';
import './Resizer.css'

class Resizer extends Component{


  constructor(){
    super();
  }

  resizerContainerMouseDowned(event){
    event.stopPropagation();
  }


  resizerUnitMousewDowned(event, resizerType){
    const mouseDownPosition = {x:event.clientX, y:event.clientY};
    this.props.resizeHandler(mouseDownPosition, resizerType);
  }


  render() { 
   if(this.props.isResizing){


   return (
    <div 
      style={{gridArea:this.props.areaName}} 
      className="cl-resizer"
      onMouseDown={e=>this.resizerContainerMouseDowned(e)}
      >

      <div className="cl-resizer-unit cl-resizer__left" onMouseDown={e=>{this.resizerUnitMousewDowned(e, 'left')}}></div>
      <div className="cl-resizer-unit cl-resizer__top" onMouseDown={e=>{this.resizerUnitMousewDowned(e, 'top')}}></div>
      <div className="cl-resizer-unit cl-resizer__right" onMouseDown={e=>{this.resizerUnitMousewDowned(e, 'right')}}></div>
      <div className="cl-resizer-unit cl-resizer__bottom" onMouseDown={e=>{this.resizerUnitMousewDowned(e, 'bottom')}}></div>

      <div className="cl-resizer-unit cl-resizer__top-left" onMouseDown={e=>{this.resizerUnitMousewDowned(e, 'topLeft')}}></div>
      <div className="cl-resizer-unit cl-resizer__top-right" onMouseDown={e=>{this.resizerUnitMousewDowned(e, 'topRight')}}></div>
      <div className="cl-resizer-unit cl-resizer__bottom-left" onMouseDown={e=>{this.resizerUnitMousewDowned(e, 'bottomLeft')}}></div>
      <div className="cl-resizer-unit cl-resizer__bottom-right" onMouseDown={e=>{this.resizerUnitMousewDowned(e, 'bottomRight')}}></div>
      
    </div>);
   }
   
    return (null);
  }
}
 
export default Resizer;