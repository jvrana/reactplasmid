import React, {Component} from 'react';
import './App.css';
import Plasmid from './components/Plasmid';

class App extends Component {
    render() {
        let featureData = [
            {start: 0, end: 1000,},
            {start: 1001, end: 1100},
            {start: 1050, end: 2000},
            {start: 1000, end: 5000},
            {start: 500, end: 3000},
            {start: 5100, end: 100},
            {start: 6000, end: 8000},
            {start: 4000, end: 150}
        ];
        return (
            <div className="App">
                <header className="App-header">
                    <h2>React Plasmid</h2>
                </header>
                <div>
                    <Plasmid radius={200} height={750} width={750} spineStroke={'gray'} spineWidth={5.0}
                             name={"peGFP"} context={9584} nameFontSize={40} infoFontSize={20}
                             tickLabelFontSize={12}
                             minorTicks={150} minorTickHeight={-10} minorTickOffset={0}
                             majorTicks={10} majorTickHeight={10} majorTickOffset={0} majorTickStroke={"blue"}
                             axisLabelOffset={15}
                             shellHeight={-10} featureCornerRadius={10} shellOffset={-20} shellPadding={-5}
                            featureData={featureData}/>
                </div>
            </div>
        );
    }
}

export default App;
