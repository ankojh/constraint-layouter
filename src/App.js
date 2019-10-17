import React from 'react';
import './App.css';
import Editor from './components/editor/Editor.component'
import Toolbar from './components/toolbar/Toolbar.component';
import CanvasContainer from './components/canvas/Canvas-Container.component';

function App() {
  return (
    <div className="App">
      <Toolbar />
      <CanvasContainer />
      {/* <Canvas /> */}
      {/* <Editor /> */}
    </div>
  );
}

export default App;
