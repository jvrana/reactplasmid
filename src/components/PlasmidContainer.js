import React, {Component} from 'react';
import Plasmid from '../components/Plasmid.js';
import PropTypes from "prop-types";
import { Panel, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';


function PlasmidToolbar(props) {
    return <ButtonToolbar>
        <DropdownButton
            bsStyle={"default"}
            title={"Plasmid Style"}
            key={1}
            id={`dropdown-basic-${1}`}
        >
            <MenuItem eventKey="1" onClick={() => {alert('ok')}}>Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3" active>
                Active Item
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
        </DropdownButton>
    </ButtonToolbar>
}

function PlasmidContainer(props) {
    return <Panel bsStyle="primary">
        <Panel.Heading>
            <Panel.Title componentClass={"h3"}>Plasmid Viewer</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            <PlasmidToolbar/>
            <div className={"plasmidpanel"} style={{width: props.plasmidInfo.width, margin: "0 auto"}}>
                <Plasmid {...props.plasmidInfo}
                         {...props.minorTickStyle}
                         {...props.majorTickStyle}
                         {...props.featureStyle}
                         {...props.spineStyle}
                         {...props.labelStyle}
                         featureData={props.featureData}/>
            </div>
        </Panel.Body>
        <Panel.Footer>
            {props.plasmidInfo.name + ": " + props.plasmidInfo.context + "bp"}
        </Panel.Footer>
    </Panel>
}

PlasmidContainer.propTypes = {
    plasmidInfo: PropTypes.object,
    minorTickStyle: PropTypes.object,
    majorTickStyle: PropTypes.object,
    featureStyle: PropTypes.object,
    featureData: PropTypes.object,
    spineStyle: PropTypes.object,
    labelStyle: PropTypes.object
};

export { PlasmidContainer };