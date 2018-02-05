import PropTypes from "prop-types";
import {Component} from "react";
import { ArcPath, Arc } from "./Arc.js"
var React = require('react');

function FeaturePath(props) {
    let start = 2.0 * Math.PI * props.start / props.context;
    let end = 2.0 * Math.PI * props.end / props.context;
    return <ArcPath start={start} end={end} innerRadius={props.innerRadius} outerRadius={props.outerRadius}
                    cornerRadius={props.cornerRadius}>{props.children}</ArcPath>
}

class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1.0
        }
    }

    onMouseEnter() {
        this.setState({opacity: 0.5});
    }

    onMouseExit() {
        this.setState({opacity: 1.0});
    }

    render() {
        return <g className={"feature"} onMouseEnter={() => {
            this.onMouseEnter()
        }} onMouseLeave={() => {
            this.onMouseExit()
        }}>
            <Arc path={this.props.path} fill={this.props.fill} opacity={this.state.opacity}
                 cornerRadius={this.props.cornerRadius} start={this.props.start} end={this.props.end}
                 innerRadius={this.props.innerRadius} outerRadius={this.props.outerRadius}/>
        </g>;
    }

}

FeaturePath.propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number.isRequired,
    context: PropTypes.number.isRequired,
};

Feature.propTypes = {
    path: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    opacity: PropTypes.number,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number,
};


export { FeaturePath, Feature };