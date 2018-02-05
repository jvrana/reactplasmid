// var React = require('react');
import PropTypes from "prop-types";

var React = require('react');

function Tick(props) {
    let theta = 0.5 * Math.PI - props.theta;
    let x1 = props.innerRadius * Math.cos(theta);
    let y1 = -props.innerRadius * Math.sin(theta);
    let x2 = props.outerRadius * Math.cos(theta);
    let y2 = -props.outerRadius * Math.sin(theta);

    let label = <text x={x1} y={y1} textAncor={'middle'} alignmentBaseline={'middle'}>{props.label}</text>
    return <g className={"tick"}>
        <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={props.stroke}
              stroke-width={props.weight}/>
        {label}</g>;
}


function Axis(props) {

    let ticks = [];
    for (let i = 0; i < props.ticks; i += 1) {
        let theta = Math.PI * 2.0 / props.ticks * i;
        let innerRadius = props.r;
        let outerRadius = innerRadius + props.tickHeight;
        let tick = <Tick stroke={props.stroke} weight={props.weight}
                         theta={theta} innerRadius={innerRadius}
                         outerRadius={outerRadius}/>;
        ticks.push(tick);
    }

    return ticks;
}

function PositionLabel(props) {
    let pos = props.pos;
    let deg = 360.0 * pos / props.context - 90.0;  // position starts at 12 O'Clock
    let t = "rotate(" + deg + ")";
    if (props.rotate) {
        t += "rotate(" + props.rotate + " " + props.r + " " + 0 + ")";
    }

    return <text
        x={props.r}
        y={0}
        transform={t}
        textAnchor={props.textAnchor}
        alignmentBaseline={'middle'}
        fontSize={props.size}
        fontFamily={props.font}>
        {props.label}
    </text>;
}

function AxisLabels(props) {
    let labels = [];
    for (let i = 0; i < props.ticks; i += 1) {
        let pos = i / props.ticks * props.context;
        let label = Math.round(pos);
        let rotate = 0;
        let textAnchor = 'end';
        if (i > props.ticks / 2.0) {
            rotate = 180;
            textAnchor = 'start';
        }
        labels.push(<PositionLabel size={props.size} font={props.font} pos={pos} textAnchor={textAnchor} rotate={rotate}
                                   label={label} r={props.r} context={props.context}/>)
    }
    return labels;
}

PositionLabel.propTypes = {
    context: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    pos: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
};

AxisLabels.propTyptes = {
    context: PropTypes.number.isRequired,
    r: PropTypes.number.isRequried,
    ticks: PropTypes.number.isRequired,
};


Tick.propTypes = {
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
};


Axis.propTypes = {
    r: PropTypes.number.isRequired,
    tickHeight: PropTypes.number.isRequired,
    ticks: PropTypes.number.isRequired,
};

export {Axis, AxisLabels, PositionLabel};