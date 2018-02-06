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
            {start: 4000, end: 150},
            {start: 500, end: 3000},
            {start: 5100, end: 100},
            {start: 6000, end: 8000},
            {start: 5000, end: 300}
        ];

        let minorTickStyle = {
            minorTicks: 350,
            minorTickHeight: -30,
            minorTickOffset: 15,
            minorTickStroke: 'gray',
            minorTickWidth: 0.5,
        };

        let majorTickStyle = {
            majorTicks: 10,
            majorTickHeight: 20,
            majorTickOffset: 0,
            majorTickStroke: "black",
            majorTickWidth: 3,
            axisLabelOffset: 25,
            tickLabelFontSize: 10,
        };

        let featureStyle = {
            shellHeight: -12,
            featureCornerRadius: 10,
            shellOffset: -25,
            shellPadding: -5,
            featureStrokeWidth: 0,
            featureStroke: 'white'
        };

        let plasmidInfo = {
            radius: 200,
            height: 750,
            width: 750,
            spineStroke: 'white',
            spineWidth: 10.0,
            name: "peGFP",
            context: 9584,
            nameFontSize: 40,
            infoFontSize: 20,
        }


        return (
            <div className="App">
                <header className="App-header">
                    <h2>React Plasmid</h2>
                </header>
                <div>
                    <Plasmid {...plasmidInfo}
                             {...minorTickStyle}
                             {...majorTickStyle}
                             {...featureStyle}
                             featureData={featureData}/>
                </div>
            </div>
        );
    }
}

export default App;
