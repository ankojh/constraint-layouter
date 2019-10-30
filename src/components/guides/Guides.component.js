import React, { Component } from 'react';
import './Guides.css'
import {getRowGuides, getColumnGuides} from '../../lib/guidesUtils'

class Guides extends Component {
  state = {  }

  guideData = {
    rowGuides:[],
    columnGuides:[]
  }

  constructor(){
    super();
  }


  componentWillUpdate(newProps){
    this.setGuideData(newProps);
  }

  componentWillMount(){
    this.setGuideData(this.props);
  }

  setGuideData(newProps){
    this.guideData = {
      rowGuides: getRowGuides(newProps.rectData, newProps.selectionId),
      columnGuides: getColumnGuides(newProps.rectData, newProps.selectionId)
    }
  }

  getRowGuidesLines(){
    return this.guideData.rowGuides.map((position,index) => {
        return (
          <div
           key={index}
           style={{top: `${position}px`}}
           className="cl-row-guide">
          </div>)
      })
  }

  getColumnGuideLines(){
    return this.guideData.columnGuides.map((position, index) => {
        return (
          <div
           key={index}
           style={{left: `${position}px`}}
           className="cl-column-guide">
          </div>)
      })
  }

  render() { 
    return ( 
      <div 
        className="cl-guides-container">
        {this.getRowGuidesLines()}
        {this.getColumnGuideLines()}
      </div> );
  }
}
 
export default Guides;