// var React = require('react');
import PropTypes from "prop-types";
import { polar2cartesian, position2theta} from "./Utils";

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

function PositionLabel(props) {

    let textAnchor = 'end';
    const theta = position2theta(props.pos, props.context);
    const deg = 360 * theta / (2*Math.PI) - 90;  // Position starts at 12 o clock
    let rot = 0.0;

    if (props.pos > props.context/2.0) {
        textAnchor = 'start';
        rot = 180;
    }

    let transform = "rotate(" + deg + ")";
    if (rot !== 0.0) {
        transform += "rotate(" + rot + " " + props.r + " " + 0 + ")";
    }

    return <text
        x={props.r}
        y={0}
        transform={transform}
        textAnchor={textAnchor}
        alignmentBaseline={'middle'}
        fontSize={props.fontSize}
        fontFamily={props.fontFamily}
    opacity={props.opacity}>
        {props.label}
    </text>;
}

function AxisLabels(props) {
    let labels = [];
    for (let i = 0; i < props.ticks; i += 1) {
        let pos = i / props.ticks * props.context;
        let label = Math.round(pos);
        labels.push(<PositionLabel key={i} fontSize={props.fontSize} fontFamily={props.fontSize} pos={pos}
                                   label={"" + label} r={props.r} context={props.context}/>)
    }
    return labels;
}

PositionLabel.propTypes = {
    context: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    pos: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    opacity: PropTypes.number,
};

AxisLabels.propTyptes = {
    context: PropTypes.number.isRequired,
    r: PropTypes.number.isRequried,
    ticks: PropTypes.number.isRequired,
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

export {Tick, Axis, AxisLabels, PositionLabel};