import React, {Component} from 'react';
import './App.css';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import ReactCursorPosition from 'react-cursor-position';

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
                stroke-width={this.props.spineWidth}
            />
        );
    }
}


class Axis extends Component {
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

    render() {
        let radius = this.props.radius;
        let minorTicks = this.props.minorTicks;
        let majorTicks = this.props.majorTicks;
        let minorTickHeight = this.props.minorTickHeight;
        let majorTickHeight = this.props.majorTickHeight;
        if (this.props.innerTicks) {
            minorTickHeight *= -1.0;
            majorTickHeight *= -1.0;
        }

        let ticks = [];
        let labels = [];
        for (let i = 0; i < minorTicks; i += 1) {
            let start = Math.PI * 2.0 / minorTicks * i;
            let end = start * 1.0000001;
            let minorTick = <Arc start={start} end={end}
                                 cx={this.props.cx} cy={this.props.cy}
                                 fill={"white"}
                                 stroke={"black"}
                                 stroke-weight={0.25}
                                 innerRadius={radius}
                                 outerRadius={radius + minorTickHeight}/>;
            ticks.push(minorTick);
        }
        for (let i = 0; i < majorTicks; i += 1) {
            let start = Math.PI * 2.0 / majorTicks * i;
            let end = start * 1.001;
            let majorTick = <Arc start={start} end={end}
                                 cx={this.props.cx} cy={this.props.cy}
                                 fill={"white"}
                                 stroke={"black"}
                                 stroke-weight={1}
                                 innerRadius={radius}
                                 outerRadius={radius + majorTickHeight}/>;
            let label = Math.round(i / majorTicks * this.props.context);
            let r = this.props.radius + majorTickHeight * 2.0;
            let x = this.props.cx + r * Math.sin(start);
            let y = this.props.cy - r * Math.cos(start);
            let text = <text x={x}
                             y={y}
                             font-size="12"
                             font-family="Verdana"
                             text-anchor="middle"
                             alignment-baseline="middle">{label}</text>;
            ticks.push(majorTick);
            labels.push(text);
        }

        return <g className={"ticks"}>
            {ticks}
            {labels}
        </g>;
    }
}

Axis.propTypes = {
    radius: PropTypes.number.isRequired,
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    minorTicks: PropTypes.number.isRequired,
    minorTickHeight: PropTypes.number.isRequired,
    majorTicks: PropTypes.number.isRequired,
    majorTickHeight: PropTypes.number.isRequired,
    innerTicks: PropTypes.bool,
    context: PropTypes.number.isRequired,
};


class ArcPath extends Component {

    constructor(props) {
        super(props);
    }

    arcGenerator(s, e) {
        return d3.arc()
            .innerRadius(this.props.innerRadius)
            .outerRadius(this.props.outerRadius)
            .cornerRadius(this.props.cornerRadius)
    }

    arcPath() {
        var arcGen = this.arcGenerator(this.props.start, this.props.end);

        var pathData = arcGen({
            startAngle: this.props.start,
            endAngle: this.props.end,
        });

        return pathData;
    }

    arcCentroid() {
        return this.arcGenerator().centroid({startAngle: this.props.start, endAngle: this.props.end});
    }

    translate(x, y) {
        return "translate(" + x + "," + y + ")"
    }

    transform() {
        return this.translate(this.props.cx, this.props.cy);
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
        return <g className={"arcpath"} transform={this.transform()}>
            {this.renderChildren()}
        </g>
    }
}

ArcPath.propTypes = {
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number
};

function Arc(props) {
    return <path className={"arc"} d={props.path} fill={props.fill} cornerRadius={props.cornerRadius} stroke={'black'} stroke-weight={1}/>
}

function ArcLabel(props) {
    return <text x={this.props.centroidx} y={this.props.centroidy} textAnchor={'middle'} alignmentBaseline={'middle'}>
        {this.props.label}
    </text>
}

Arc.propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number,
    fill: PropTypes.string.isRequired,
};


class FeaturePath extends Component {
    constructor(props) {
        super(props);
    }

    renderChildren() {
        let padding = 5.0;
        let delta = padding + this.props.boxHeight;

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
        let padding = 5.0;
        let delta = padding + this.props.boxHeight;
        let shell = this.props.shell + this.props.shellOffset;
        let innerRadius = this.props.radius + delta * this.props.shell;
        let outerRadius = innerRadius + this.props.boxHeight;
        let start = this.radialScaleAng(this.props.start);
        let end = this.radialScaleAng(this.props.end);
    }

}


class Feature extends Component {
    constructor(props) {
        super(props);
    }

    radialScaleAng(x) {
        return x / this.props.context * 2 * Math.PI
    }

    // polarToCart(r, theta) {
    //     let x = r * Math.sin(theta);
    //     let y = r * Math.cos(theta);
    //     return [x, y];
    // }
    //
    // radialScale(x, y) {
    //     let theta = this.radialScaleAng(x);
    //     let r = this.props.radius + y;
    //     return this.polarToCart(r, theta)
    // }

    render() {
        let padding = 5.0;
        let delta = padding + this.props.boxHeight;
        let shell = this.props.shell + this.props.shellOffset;
        let innerRadius = this.props.radius + delta * this.props.shell;
        let outerRadius = innerRadius + this.props.boxHeight;
        let start = this.radialScaleAng(this.props.start);
        let end = this.radialScaleAng(this.props.end);
        return <ArcPath className={"feature"} cx={this.props.cx}
                     cy={this.props.cy}
                     innerRadius={innerRadius}
                     outerRadius={outerRadius}
                     start={start}
                     end={end}>
                <Arc className={"featurePath"} fill={this.props.fill} cornerRadius={3}/>
            </ArcPath>;
    }
}

Feature.propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    boxHeight: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    context: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
    shell: PropTypes.number,
};

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


class Features extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: this.props.data
        }
    }

    enterFeature(i) {
        let featureData = this.state.features.slice();
        featureData[i]['_fill'] = featureData[i]['fill'];
        featureData[i]['fill'] = 'gray';
        this.setState({features: featureData});
    }

    exitFeature(i) {
        let featureData = this.state.features.slice();
        featureData[i]['fill'] = featureData[i]['_fill'];
        this.setState({features: featureData});
    }


    render() {
        // let features = <Feature height={this.state.features[0].height} start={0} end={250}
        //                         width={this.state.features[0].width} radius={this.state.features[0].radius}
        //                         boxHeight={this.state.features[0].boxHeight} context={1000}
        //                         fill={this.state.features[0].fill}
        //                         onMouseEnter={this.onMouseEnter(0)}
        //                         onMouseExit={this.onMouseExit(0)}/>;
        //
        //                         console.log(features);
        // return <Feature height={this.state.features[0].height} start={0} end={250}
        //                 width={this.state.features[0].width} radius={this.state.features[0].radius}
        //                 boxHeight={this.state.features[0].boxHeight} context={1000}
        //                 fill={this.state.features[0].fill}/>;


        let features = this.state.features.map(
            (f, i) => {
                let shell = f.shell + this.props.shellOffset;
                if (this.props.inner) {
                    shell *= -1.0;
                }
                return <g className={"feature"} onMouseEnter={() => {
                    return this.enterFeature(i)
                }}
                          onMouseLeave={() => {
                              return this.exitFeature(i)
                          }}>
                    <Feature key={i} start={f.start} end={f.end}
                             cx={this.props.cx} cy={this.props.cy}
                             radius={this.props.radius}
                             boxHeight={this.props.boxHeight} context={this.props.context}
                             fill={f.fill} shell={shell} cornerRadius={this.props.cornerRadius}
                    /></g>;
            }
        );

        return <g className={"Features"}>{features}</g>
    }
}

Feature.propTypes = {
    cy: PropTypes.number.isRequired,
    cx: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    boxHeight: PropTypes.number.isRequired,
    context: PropTypes.number.isRequired,
    shellOffset: PropTypes.number,
    cornerRadius: PropTypes.number,
};


const PositionLabel = (props) => {
    const {
        detectedEnvironment: {
            isMouseDetected = false,
            isTouchDetected = false
        } = {},
        elementDimensions: {
            width = 0,
            height = 0
        } = {},
        isActive = false,
        isPositionOutside = false,
        position: {
            x = 0,
            y = 0
        } = {}
    } = props;

    return (
        <div className="example__label">
            {`x: ${x}`}<br/>
            {`y: ${y}`}<br/>
            {`width:: ${width}`}<br/>
            {`height: ${height}`}<br/>
            {`isActive: ${isActive}`}<br/>
            {`isPositionOutside: ${isPositionOutside ? 'true' : 'false'}`}<br/>
            {`isMouseDetected: ${isMouseDetected ? 'true' : 'false'}`}<br/>
            {`isTouchDetected: ${isTouchDetected ? 'true' : 'false'}`}
        </div>
    );
};

// class Highlight (basically a Feature

function Base(props) {
    let cx = 500;
    let cy = 500;
    let size = props.size;
    return <g className={'base'}>
        <rect width={size} height={size} x={cx} y={cy} fill={"none"} stroke={'black'} stroke-weight={1}/>
        <text x={cx + size / 2.0} y={cy + size / 2.0} alignmentBaseline={'middle'} textAnchor={'middle'}>
            T
        </text>
    </g>
}

class BaseViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bases: "ACGTAGTCGTATCGTAGCTGCATGTCGATGCTGTGATGTGATGTG"
        }
    }

    render() {
        return <Base x={0} y={0} size={20} base={"A"}/>
    }
}

class Plasmid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featureData: [
                {start: 300, end: 750, fill: "#feadb4", shell: 3},
                {start: 500, end: 1000, fill: "#9ca0fe", shell: 2},
                {start: 2102, end: 2350, fill: "#fef9a6", shell: 2},
                {start: 3000, end: 6000, fill: "#bdbefe", shell: 2},
                {start: 65, end: 9000, fill: "#a3fec0", shell: 1}
            ],
            x: 0,
            y: 0,
        }
    }

    _onMouseMove(e) {
        this.setState({
            x: e.screenX - this.props.width / 2.0,
            y: e.screenY,
        })
    }

    render() {
        let cx = this.props.width / 2.0;
        let cy = this.props.height / 2.0;

        return <div>
            <div>
                <svg onMouseMove={this._onMouseMove.bind(this)} width={this.props.width} height={this.props.height}>
                    {/*<defs>*/}
                    {/*<Arrow/>*/}
                    {/*</defs>*/}
                    {/*<line x1="0" y1="0" x2="200" y2="50" stroke="red" stroke-width="2" marker-end="url(#arrow)"/>*/}

                    <Spine height={this.props.height} width={this.props.width} radius={this.props.radius}
                           spineWidth={this.props.spineWidth}/>
                    <Axis cx={cx}
                          cy={cy}
                          radius={this.props.radius}
                          minorTicks={100}
                          majorTicks={25}
                          minorTickHeight={10}
                          majorTickHeight={18}
                          innerTicks={true}
                          context={this.props.context}
                    />
                    <ReactCursorPosition className={"example"}>
                        <PositionLabel/>
                    </ReactCursorPosition>
                    <Features cx={cx}
                              cy={cy}
                              context={this.props.context}
                              boxHeight={this.props.boxHeight}
                              radius={this.props.radius}
                              data={this.state.featureData}
                              shellOffset={0}
                              inner={false}
                              cornerRadius={10.0}
                    />
                    <text x={cx}
                          y={cy}
                          font-size="25"
                          font-family="Verdana"
                          text-anchor="middle"
                          alignment-baseline="middle">
                        pGRR-W8-RGR-W36
                    </text>
                    ;
                    {/*<BaseViewer/>*/}
                </svg>
            </div>
            ;
        </div>;
    }
}

export default Plasmid