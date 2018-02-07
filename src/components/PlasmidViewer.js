import React, {Component} from 'react';
import { PlasmidContainer } from './PlasmidContainer'
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import PropTypes from "prop-types";

function PlasmidViewer(props) {
    console.log(props);
    return <Grid>
        <Row className="show-grid">
            <Col lg={3} md={3} sm={3}>
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass={"h3"}>Assembly Parameters</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                    </Panel.Body>
                    <Panel.Footer>
                    </Panel.Footer>
                </Panel>
            </Col>
            <Col lg={6} md={8} sm={8}>
                <PlasmidContainer {...props}/>
            </Col>
        </Row>
    </Grid>;
}

PlasmidViewer.propTypes = {
    plasmidInfo: PropTypes.object,
    labelStyle: PropTypes.object,
    minorTickStyle: PropTypes.object,
    majorTickStyle: PropTypes.object,
    featureStyle: PropTypes.object,
    featureData: PropTypes.object,
    spineStyle: PropTypes.object,
};

export { PlasmidViewer }