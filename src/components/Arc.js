import PropTypes from "prop-types";
import * as d3 from "d3";
var React = require('react');


function ArcPath(props) {
    let start = props.start;
    let end = props.end;

    let _end = end - start;
    if (_end < 0) {
        _end = 2*Math.PI + _end;
    }

    let rot = "rotate(" + 180 * start / Math.PI + ")";

    const pathData = d3.arc()
            .innerRadius(props.innerRadius)
            .outerRadius(props.outerRadius)
            .cornerRadius(props.cornerRadius)
            .startAngle(0)
            .endAngle(_end);

    const centroid = pathData.centroid();

    const children = React.Children.map(props.children,
            child => {
                return React.cloneElement(child, {
                    centroidx: centroid[0],
                    centroidy: centroid[1],
                    path: pathData(),
                    radius: props.radius,
                    innerRadius: props.innerRadius,
                    outerRadius: props.outerRadius,
                    context: props.context,
                });
            }
        );

    return <g className={"arcpath"} transform={rot}>{children}</g>;
}

function Arc(props) {
    return <path className={"arc"} d={props.path} fill={props.fill} stroke={'black'}
                 strokeWidth={props.strokeWidth} opacity={props.opacity}/>
}


Arc.propTypes = {
    path: PropTypes.string.isRequired,
    fill: PropTypes.string,
    cornerRadius: PropTypes.number,
    opacity: PropTypes.number,
};

Arc.defaultProps = {
    strokeWidth: 1.0,
    opacity: 1.0,
};


ArcPath.propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number
};

ArcPath.defaultProps = {
    strokeWidth: 1.0,
    opacity: 1.0,
};

export { ArcPath, Arc };