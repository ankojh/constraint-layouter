import React, { Component } from 'react';
import './App.css';
import Editor from './components/editor/Editor.component'
import Toolbar from './components/toolbar/Toolbar.component';
import CanvasContainer from './components/canvas/Canvas-Container.component';
import { fromEvent } from 'rxjs';

class App extends Component {

  state = {
    keyStatus: null
  }

  keyDownSubscription = null;
  keyUpSubscription = null;

  constructor(){
    super();
    
    this.keyDownSubscription = fromEvent(window, 'keydown').subscribe(e => {
      this.keyDownHandler(e)
    })

    this.keyUpSubscription = fromEvent(window, 'keyup').subscribe(e => {
      this.keyUpHandler(e)
    })
  }


  updateState(partialState){
    const newState = {...this.state};
    Object.keys(partialState).forEach(key=>{
      newState[key] = partialState[key];
    })

    this.setState(newState);
  }


  keyDownHandler(event){
    if(this.state.keyStatus!=event.keyCode){
      this.updateState({keyStatus: event.keyCode});
    }
  }

  keyUpHandler(event){
    this.updateState({keyStatus: null});
  }


  componentWillUnmount(){
    this.keyDownSubscription.unsubscribe();
    this.keyUpSubscription.unsubscribe();
  }

  render() { 
    
    return ( 
      <div className="App"> 
        <CanvasContainer 
          keyStatus={this.state.keyStatus}
        />
      </div> 
    );
  }
}

export default App;
