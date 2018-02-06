// var React = require('react');
import PropTypes from "prop-types";
import {polar2cartesian, position2theta, position2cartesian} from "./Utils";

var React = require('react');

function Tick(props) {
    let x1, y1, x2, y2;
    [x1, y1] = polar2cartesian(props.innerRadius, props.theta);
    [x2, y2] = polar2cartesian(props.outerRadius, props.theta);

    return <line x1={x1} y1={y1} x2={x2} y2={y2}
                 stroke={props.stroke}
                 strokeWidth={props.weight} opacity={props.opacity}/>;
}


function Axis(props) {

    let ticks = [];
    for (let i = 0; i < props.ticks; i += 1) {
        let theta = Math.PI * 2.0 / props.ticks * i;
        let innerRadius = props.r;
        let outerRadius = innerRadius + props.tickHeight;
        let tick = <Tick key={i + "ljlj"} stroke={props.stroke} weight={props.weight}
                         theta={theta} innerRadius={innerRadius}
                         outerRadius={outerRadius}/>;
        ticks.push(tick);
    }

    return ticks;
}

function RotatedPositionLabel(props) {
    let _anchors = {true: 'end', false: 'start'};
    let textAnchor = _anchors[props.inside];
    const theta = position2theta(props.pos, props.context);
    const deg = 360 * theta / (2 * Math.PI) - 90;  // Position starts at 12 o clock
    let rotateInPlace = 0.0;  // amount to rot

    if (props.pos > props.context / 2.0) {
        textAnchor = _anchors[!props.inside];
        rotateInPlace = 180;
    }


    // transform
    let transform = "rotate(" + deg + ")";
    if (props.align) {
        rotateInPlace = -deg;
    }
    if (rotateInPlace !== 0.0) {
        transform += "rotate(" + rotateInPlace + " " + props.r + " " + 0 + ")";
    }

    return <text
        x={props.r}
        y={0}
        transform={transform}
        textAnchor={textAnchor}
        alignmentBaseline={'central'}
        fontSize={props.fontSize}
        fontFamily={props.fontFamily}
        opacity={props.opacity}>
        {props.label}
    </text>;
}


RotatedPositionLabel.propTypes = {
    context: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    pos: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    opacity: PropTypes.number,
    inside: PropTypes.bool,
};

RotatedPositionLabel.propTypes = {
    inside: true,
}


function PositionLabel(props) {


    let x1, y1, x2, y2;
    [x1, y1] = position2cartesian(props.pos, props.context, props.r);
    [x2, y2] = position2cartesian(props.pos, props.context, props.r + props.labelLength);

    let textAnchor = 'start';
    let offsetLength = props.offsetLength;
    let labelOffsetX = props.labelOffsetX;
    if (x1 > x2) {
        textAnchor = 'end';
        offsetLength *= -1;
        labelOffsetX *= -1;
    }

    let deltaX, deltaY, x3, y3, x4, y4;
    [deltaX, deltaY] = polar2cartesian(offsetLength, 0.5 * Math.PI);
    [x3, y3] = [deltaX + x2, deltaY + y2];
    [x4, y4] = [labelOffsetX + x3, props.labelOffsetY + y3];
    return <g className={"label"}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={props.stroke} strokeWidth={props.strokeWidth} opacity={props.opacity}/>
        <line x1={x2} y1={y2} x2={x3} y2={y3} stroke={props.stroke} strokeWidth={props.strokeWidth}opacity={props.opacity}/>
        <text x={x4} y={y4} fontSize={props.fontSize} fontFamily={props.fontFamily} textAnchor={textAnchor}
              alignmentBaseline={'middle'} opacity={props.opacity}>{props.label}</text>
    </g>;
}

PositionLabel.propTypes = {
    pos: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    labelLength: PropTypes.number.isRequired,
    context: PropTypes.number.isRequired,
    offsetLength: PropTypes.number,
    label: PropTypes.string.isRequired,
    labelOffsetX: PropTypes.number,
    labelOffsetY: PropTypes.number,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    opacity: PropTypes.number,
};

PositionLabel.defaultProps = {
    offsetX: 0,
    offsetY: 0,
    labelOffsetX: 0,
    labelOffsetY: 0,
    stroke: 'black',
    strokeWidth: 1,
    fontSize: 12,
    fontFamily: "Verdana",
    offsetLength: 0,
    opacity: 1.0,
};


function AxisLabels(props) {
    let labels = [];
    for (let i = 0; i < props.ticks; i += 1) {
        let pos = i / props.ticks * props.context;
        let label = Math.round(pos);
        labels.push(<RotatedPositionLabel key={i} fontSize={props.fontSize} fontFamily={props.fontSize} pos={pos}
                                          label={"" + label} r={props.r + props.axisLabelOffset} context={props.context} inside={props.axisLabelOffset < 0}/>)
    }
    return labels;
}

AxisLabels.propTypes = {
    context: PropTypes.number.isRequired,
    r: PropTypes.number.isRequried,
    ticks: PropTypes.number.isRequired,
    axisLabelOffset: PropTypes.number,
};


Tick.propTypes = {
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    theta: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    stroke: PropTypes.string,
    opacity: PropTypes.number,
};


Axis.propTypes = {
    r: PropTypes.number.isRequired,
    tickHeight: PropTypes.number.isRequired,
    ticks: PropTypes.number.isRequired,
};

export {Tick, Axis, AxisLabels, RotatedPositionLabel, PositionLabel };