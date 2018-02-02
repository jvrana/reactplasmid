import React, {Component} from 'react';
import './App.css';
import * as d3 from 'd3';


class Spine extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <circle
                className="spine"
                cx={this.props.width / 2.0}
                cy={this.props.height / 2.0}
                r={this.props.radius}
                stroke='black'
                fill='none'
                stroke-width={this.props.spine_width}
            />
        );
    }
}


class Arc extends Component {
    constructor(props) {
        super(props);
    }

    translate(x, y) {
        return "translate(" + x + "," + y + ")";
    }

    arcGenerator(s, e) {
        var arcGenerator = d3.arc()
            .innerRadius(this.props.inner_radius)
            .outerRadius(this.props.outer_radius);

        var pathData = arcGenerator({
            startAngle: s,
            endAngle: e,
        });

        return pathData;
    }

    render() {
        return <path
            d={this.arcGenerator(this.props.start, this.props.end)}
            fill="none"
            stroke-width="3"
            stroke="black"
            transform={this.translate(this.props.cx, this.props.cy)}
        />;
    }
}


class Feature extends Component {
    constructor(props) {
        super(props);
    }

    radialScaleAng(x) {
        return x / this.props.context * 2 * Math.PI
    }

    polarToCart(r, theta) {
        let x = r * Math.sin(theta);
        let y = r * Math.cos(theta);
        return [x, y];
    }

    radialScale(x, y) {
        let theta = this.radialScaleAng(x);
        let r = this.props.radius + y;
        return this.polarToCart(r, theta)
    }

    render() {
        return <g id="feature">
            <Arc
                start={this.radialScaleAng(this.props.start)}
                end={this.radialScaleAng(this.props.end)}
                inner_radius={this.props.radius}
                outer_radius={this.props.radius + this.props.boxheight}
                cx={this.props.width / 2.0}
                cy={this.props.height / 2.0}/>
        </g>
    }
}

//
// class Feature extends Component {
//     constructor(props) {
//         super(props);
//         this.createFeature = this.createFeature.bind(this)
//     }
//
//     update() {
//         this.createFeature();
//     }
//
//     componentDidMount() {
//         this.update();
//     }
//
//     componentDidUpdate() {
//         this.update();
//     }
//
//     createFeature() {
//         const node = this.node;
//
//         var arcGenerator = d3.arc()
//             .innerRadius(this.props.radius)
//             .outerRadius(this.props.radius+10.0);
//
//         var pathData = arcGenerator({
//             startAngle: 0,
//             endAngle: 0.25 * Math.PI,
//             cx: 20
//         });
//
//
//
//         d3.select(node)
//             .append('path')
//             .attr('d', pathData)
//             .style('fill', 'none')
//             .attr('stroke-width', 2)
//             .attr('stroke', 'black')
//             .attr('transform', "translate(" + this.props.width/2.0 + "," + this.props.height/2.0 + ")")
//     }
//
//     render() {
//         return (
//             <div className="feature">
//                 <svg ref={node => this.node = node} width={this.props.width} height={this.props.height}></svg>
//             </div>
//         );
//     }
// }

function Arrow(props) {
    return <marker
        id="arrow"
        markerUnits="strokeWidth"
        markerWidth="12"
        markerHeight="12"
        viewBox="0 0 12 12"
        refX="6"
        refY="6"
        orient="auto">
        <path d="M2,2 L10,6 L2,10 L6,6 L2,2" styles="fill: #f00;"></path>
    </marker>
}

class Plasmid extends Component {
    constructor(props) {
        super(props);
    }

    onHover() {
        alert("OK!")
    }

    render() {
        return <svg width={500} height={500}>
            <defs>
                <Arrow/>
            </defs>
            <line x1="0" y1="0" x2="200" y2="50" stroke="red" stroke-width="2" marker-end="url(#arrow)"/>

            <Spine height={this.props.height} width={this.props.width} radius={this.props.radius}
                   spine_width={this.props.spine_width}/>
            <g onMouseEnter={this.onHover}>
                <Feature height={this.props.height} start={0} end={250}
                         width={this.props.width} radius={this.props.radius}
                         boxheight={this.props.boxheight} context={1000}
                         onMouseEnter={this.onHover}
                />
            </g>
    </svg>
        ;
    }
}


export default Plasmid