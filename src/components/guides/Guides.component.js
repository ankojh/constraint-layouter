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

    const selectedRectData = newProps.rectData.find(rectData=>rectData.id == newProps.selectionId);

    this.guideData = {
      rowGuides: getRowGuides(newProps.rectData, selectedRectData),
      columnGuides: getColumnGuides(newProps.rectData, selectedRectData)
    }
  }

  getRowGuidesLines(){
    return this.guideData.rowGuides.map((guideData,index) => {
        return (
          <div
           key={index}
           style={{top: `${guideData.position}px`}}
           className="cl-row-guide">
          </div>)
      })
  }

  getColumnGuideLines(){
    return this.guideData.columnGuides.map((guideData, index) => {
        return (
          <div
           key={index}
           style={{left: `${guideData.position}px`}}
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