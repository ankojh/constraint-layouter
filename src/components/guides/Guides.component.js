import React, { Component } from 'react';
import './Guides.css'
import {getRowGuides, getColumnGuides} from '../../lib/guidesUtils'

class Guides extends Component {
  state = {  }

  guideData = {
    row:{guides: [], wrtRectIds: []},
    column:{guides: [], wrtRectIds: []}
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

    const selectedRectData = newProps.rectData.find(rectData=>rectData.id == newProps.mouseDownRectId);

    console.log(selectedRectData);

    let wrtRectIds = this.props.wrtRectIdsIsSet ? [...this.props.wrtRectIds] : []

    this.guideData = {
      row: getRowGuides(newProps.rectData, selectedRectData, wrtRectIds),
      column: getColumnGuides(newProps.rectData, selectedRectData, wrtRectIds)
    }

    if (!this.props.wrtRectIdsIsSet) {
      const newWrtRectIds = Array.from(new Set([...this.guideData.row.wrtRectIds, ...this.guideData.column.wrtRectIds]));

      const guidesStatus = {
          x: this.guideData.column.wrtRectIds.length ? true : false,
          y: this.guideData.row.wrtRectIds.length ? true : false
        };



      if (newWrtRectIds[0] != this.props.wrtRectIds[0] 
            || newWrtRectIds.length != this.props.wrtRectIds.length 
            || guidesStatus.x != this.props.guidesStatus.x 
            || guidesStatus.y != this.props.guidesStatus.y) { //fix this condition
        this.props.updateState({
          wrtRectIds:newWrtRectIds,
          guidesStatus 
        });
      }
    }

  }

  getRowGuidesLines(){
    return this.guideData.row.guides.map((guideData,index) => {
        return (
          <div
           key={index}
           style={{top: `${guideData.position}px`}}
           className="cl-row-guide">
          </div>)
      })
  }

  getColumnGuideLines(){
    return this.guideData.column.guides.map((guideData, index) => {
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