import React, { Component } from 'react';
import './App.css';
import Plasmid from './Plasmid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>React Plasmid</h2>
        </header>
        <div>
            <Plasmid radius={100} width={500} height={500} spine_width={5} boxheight={12}/>
        </div>
      </div>
    );
  }
}

export default App;
