import PropTypes from "prop-types";
import * as d3 from "d3";
var React = require('react');


class ArcPath extends React.Component {

    constructor(props) {
        super(props);
    }

    arcGenerator() {
        return d3.arc()
            .innerRadius(this.props.innerRadius)
            .outerRadius(this.props.outerRadius)
            .cornerRadius(this.props.cornerRadius)
    }

    arcPath() {
        var arcGen = this.arcGenerator();

        var pathData = arcGen({
            startAngle: this.props.start,
            endAngle: this.props.end,
        });

        return pathData;
    }

    arcCentroid() {
        return this.arcGenerator().centroid({startAngle: this.props.start, endAngle: this.props.end});
    }

    renderChildren() {
        return React.Children.map(this.props.children,
            child => {
                return React.cloneElement(child, {
                    cx: this.props.cx,
                    cy: this.props.cy,
                    centroidx: this.arcCentroid()[0],
                    centroidy: this.arcCentroid()[1],
                    path: this.arcPath(),
                    start: this.props.start,
                    end: this.props.end,
                });
            }
        );
    }

    render() {
        return <g className={"arcpath"}>
            {this.renderChildren()}
        </g>
    }
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

export { ArcPath, Arc };