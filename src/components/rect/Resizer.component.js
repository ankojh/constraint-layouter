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
    
  }


  render() { 
   if(this.props.isResizing){
   return (
    <div 
      style={{gridArea:this.props.areaName}} 
      className="cl-resizer"
      onMouseDown={e=>this.resizerContainerMouseDowned(e)}
      >

      <div className="cl-resizer-unit cl-resizer__left"></div>
      <div className="cl-resizer-unit cl-resizer__top"></div>
      <div className="cl-resizer-unit cl-resizer__right"></div>
      <div className="cl-resizer-unit cl-resizer__bottom"></div>

      <div className="cl-resizer-unit cl-resizer__top-left"></div>
      <div className="cl-resizer-unit cl-resizer__top-right"></div>
      <div className="cl-resizer-unit cl-resizer__bottom-left"></div>
      <div className="cl-resizer-unit cl-resizer__bottom-right"></div>
      
    </div>);
   }
   
    return (null);
  }
}
 
export default Resizer;