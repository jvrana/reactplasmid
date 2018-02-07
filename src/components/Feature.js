import PropTypes from "prop-types";
import {Component} from "react";
import {ArcPath, Arc} from "./Arc.js"
import {Tick, PositionLabel} from "./Axis.js"
import {position2theta} from "./Utils.js"

let randomColor = require('randomcolor');
var React = require('react');


class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1.0,
            tickOpacity: 0.0,
            fill: this.props.fill,
        };
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseExit = this.onMouseExit.bind(this);
    }

    static propTypes = {
        path: PropTypes.string,
        fill: PropTypes.string,
        opacity: PropTypes.number,
        start: PropTypes.number.isRequired,
        end: PropTypes.number.isRequired,
        innerRadius: PropTypes.number,
        outerRadius: PropTypes.number,
        cornerRadius: PropTypes.number,
        stroke: PropTypes.string,
        strokeWidth: PropTypes.number,
        featureRandomColorGenerator: PropTypes.func,
    };

    static defaultProps = {
        featureRandomColorGenerator: () => { return randomColor({'luminosity': 'light'})},
    };

    componentWillMount() {
        if (!this.state.fill || this.state.fill === 'none') {
            this.setState({
                fill: this.props.featureRandomColorGenerator()
            })
        }
    }


    onMouseEnter() {
        this.setState({
            opacity: 0.5,
            tickOpacity: 1.0,
        });
        this.props.onFeatureHover();
    }

    onMouseExit() {
        this.setState({
            opacity: 1.0,
            tickOpacity: 0.0,
        });
    }

    render() {
        let radStart = position2theta(this.props.start, this.props.context);
        let radEnd = position2theta(this.props.end, this.props.context);
        let labelPos = this.props.radius - 100.0;
        return <g className={"feature"}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseExit}>
            <ArcPath start={radStart} end={radEnd} innerRadius={this.props.innerRadius}
                     outerRadius={this.props.outerRadius}
                     cornerRadius={this.props.cornerRadius} radius={this.props.radius}
                     context={this.props.context}>
                <Arc path={this.props.path} fill={this.state.fill} opacity={this.state.opacity} stroke={this.props.stroke} strokeWidth={this.props.strokeWidth}/>
            </ArcPath>
            <PositionLabel pos={this.props.start} r={this.props.outerRadius + 5} labelLength={this.props.radius - this.props.outerRadius + 20} offsetLength={20}
                           labelOffsetX={10} opacity={this.state.tickOpacity}
                           labelOffsetY={0} stroke={'red'} fontSize={15} strokeWidth={2}
                           context={this.props.context} label={Math.round(this.props.start)}/>
            <PositionLabel pos={this.props.end} r={this.props.outerRadius + 5} labelLength={this.props.radius - this.props.outerRadius + 20} offsetLength={20}
                           labelOffsetX={10} opacity={this.state.tickOpacity}
                           labelOffsetY={0} stroke={'red'} fontSize={15} strokeWidth={2}
                           context={this.props.context} label={Math.round(this.props.end)}/>
            {/*<RotatedPositionLabel context={this.props.context} label={this.props.start} pos={this.props.start}*/}
            {/*r={labelPos} fontSize={12} fontFamily={"Verdana"} opacity={this.state.tickOpacity} align={true}/>*/}
            {/*<RotatedPositionLabel context={this.props.context} label={this.props.end} pos={this.props.end}*/}
            {/*r={labelPos} fontSize={12} fontFamily={"Verdana"} opacity={this.state.tickOpacity} align={true}/>*/}
        </g>;
    }

}


function Highlight(props) {
    let radStart = position2theta(props.start, props.context);
    let radEnd = position2theta(props.start, props.context);
    return <g className={"highlight"}>
        <ArcPath start={radStart} end={radEnd} innerRadius={props.ir} outerRadius={props.or}
                 cornerRadius={0} radius={props.radius}
                 context={props.context}>
            <Arc fill={props.fill} opacity={props.opacity}/>
        </ArcPath></g>;
}

Highlight.propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    lr: PropTypes.number.isRequired,
    ir: PropTypes.number.isRequired,
    or: PropTypes.number.isRequired,
    fill: PropTypes.string,
    opacity: PropTypes.number,
};


export {Highlight, Feature};