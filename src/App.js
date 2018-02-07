import React, {Component} from 'react';
import './App.css';
import Plasmid from './components/Plasmid';
import BootstrapTest from './components/Test';
import {Panel, Grid, Row, Col, Tab, Tabs, Alert, Jumbotron} from 'react-bootstrap';
import {PlasmidContainer} from './components/PlasmidContainer';
import {PlasmidViewer} from "./components/PlasmidViewer";
import { plasmidStyle } from './components/plasmidStyles/style1.js'

let randomColor = require('randomcolor');

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


        let plasmidInfo = {
            radius: 200,
            height: 500,
            width: 500,
            name: "peGFP",
            context: 9584,
        };


        const dummySentences = [
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
            'Donec hendrerit tempor tellus.',
            'Donec pretium posuere tellus.',
            'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.',
            'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
            'Nulla posuere.',
            'Donec vitae dolor.',
            'Nullam tristique diam non turpis.',
            'Cras placerat accumsan nulla.',
            'Nullam rutrum.',
            'Nam vestibulum accumsan nisl.'
        ];

        return <div className="App">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            </link>

            <Jumbotron>
                <h1>ReactPlasmid</h1>
                <p>
                    Beautiful plasmid visualization for all.
                </p>
            </Jumbotron>


            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Plasmid Map">
                    <PlasmidViewer plasmidInfo={plasmidInfo} {...plasmidStyle} featureData={featureData} />
                </Tab>
                <Tab eventKey={2} title="Baseviewer">
                    <Alert bsStyle="warning">Oh no! This isn't implemented yet!"</Alert>
                </Tab>
                <Tab eventKey={3} title="Assembly">
                    <Alert bsStyle="warning">Oh no! This isn't implemented yet!"</Alert>
                </Tab>
            </Tabs>
            </div>;
    }
}

export default App;
