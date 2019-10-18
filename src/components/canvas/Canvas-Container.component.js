import React from 'react';
import Canvas from './Canvas.component';
import './Canvas-Container.css'

function CanvasContainer(){
  return (
    <div className="cl-canvas-container">
        <div className="cl-canvas__transform">
          <Canvas />
        </div>
    </div>
  )
}

export default CanvasContainer;