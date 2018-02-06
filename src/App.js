import React, { Component } from 'react';
import './App.css';
import Plasmid from './components/Plasmid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>React Plasmid</h2>
        </header>
        <div>
            <Plasmid radius={200} width={750} height={750} spineWidth={5.0} context={9584} name={"peGFP"}/>
        </div>
      </div>
    );
  }
}

export default App;
