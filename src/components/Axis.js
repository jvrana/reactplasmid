// var React = require('react');
import PropTypes from "prop-types";

var React = require('react');

function Tick(props) {
    let theta = 0.5 * Math.PI - props.theta;
    let x1 = props.innerRadius * Math.cos(theta);
    let y1 = -props.innerRadius * Math.sin(theta);
    let x2 = props.outerRadius * Math.cos(theta);
    let y2 = -props.outerRadius * Math.sin(theta);

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
    let deg = 360.0 * props.pos / props.context - 90.0;  // position starts at 12 O'Clock
    let t = "rotate(" + deg + ")";
    if (props.rotate) {
        t += "rotate(" + props.rotate + " " + props.r + " " + 0 + ")";
    }

    let textAnchor = 'end';
    let theta = 360 * props.pos / props.context - 90.0;
    let rot = 0.0;

    // if (!props.rotate) {
    //     rot = -theta;
    // }
    if (props.pos > props.context/2.0) {
        textAnchor = 'start';
        rot = 180;
    }

    let transform = "rotate(" + theta + ")";
    if (rot != 0.0) {
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