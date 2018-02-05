import PropTypes from "prop-types";
import {Component} from "react";
import {ArcPath, Arc} from "./Arc.js"
import {Tick, PositionLabel} from "./Axis.js"

var React = require('react');


class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1.0,
            tickOpacity: 0.0
        }
    }

    onMouseEnter() {
        this.setState({
            opacity: 0.5,
            tickOpacity: 1.0,
        });
    }

    onMouseExit() {
        this.setState({
            opacity: 1.0,
            tickOpacity: 0.0,
        });
    }

    render() {
        let radStart = 2.0 * Math.PI * this.props.start / this.props.context;
        let radEnd = 2.0 * Math.PI * this.props.end / this.props.context;
        let labelPos = this.props.radius - 100.0;
        return <g className={"feature"}
                  onMouseEnter={() => {this.onMouseEnter()}}
                  onMouseLeave={() => {this.onMouseExit()}}>
            <ArcPath start={radStart} end={radEnd} innerRadius={this.props.innerRadius} outerRadius={this.props.outerRadius}
                     cornerRadius={this.props.cornerRadius} radius={this.props.radius}
                     context={this.props.context}>
                <Arc path={this.props.path} fill={this.props.fill} opacity={this.state.opacity}/>
            </ArcPath>
                <Tick theta={radStart} innerRadius={labelPos} outerRadius={this.props.innerRadius}
                      stroke={'red'} opacity={this.state.tickOpacity} weight={1.0}/>
                <Tick theta={radEnd} innerRadius={labelPos} outerRadius={this.props.innerRadius}
                      stroke={'red'} opacity={this.state.tickOpacity} weight={1.0}/>
                <PositionLabel context={this.props.context} label={this.props.start} pos={this.props.start}
                               r={labelPos} fontSize={12} fontFamily={"Verdana"} opacity={this.state.tickOpacity}/>
                <PositionLabel context={this.props.context} label={this.props.end} pos={this.props.end}
                               r={labelPos} fontSize={12} fontFamily={"Verdana"} opacity={this.state.tickOpacity}/>
        </g>;
    }

}

Feature.propTypes = {
    path: PropTypes.string,
    fill: PropTypes.string.isRequired,
    opacity: PropTypes.number,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    cornerRadius: PropTypes.number,
};


export { Feature};