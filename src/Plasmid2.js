import React, {Component} from 'react';
import './App.css';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import ReactCursorPosition from 'react-cursor-position';
import range from 'lodash/range'

class PlasmidPath extends Component {
    constructor(props) {
        super(props);
    }

    posToRad(x) {
        return x / this.props.context * 2 * Math.PI
    }

    renderChildren() {
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                cx: this.props.width / 2.0,
                cy: this.props.height / 2.0,
                context: this.props.context,
                radius: this.props.radius,
            })
        });
    }

    render() {
        return <svg width={this.props.width} height={this.props.height}>
            <circle
                className="spine"
                cx={this.props.width / 2.0}
                cy={this.props.height / 2.0}
                r={this.props.radius}
                stroke='black'
                fill='none'
                stroke-width={this.props.spineWidth}
            />
            {this.renderChildren()}</svg>;
    }
}


PlasmidPath.propTypes = {
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
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

ArcPath.propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number
};

function Arc(props) {
    return <path className={"arc"} d={props.path} fill={props.fill} cornerRadius={props.cornerRadius} stroke={'black'}
                 stroke-weight={30} opacity={props.opacity}/>
}


function FeaturePath(props) {
    let start = 2.0 * Math.PI * props.start / props.context;
    let end = 2.0 * Math.PI * props.end / props.context;
    return <ArcPath start={start} end={end} innerRadius={props.innerRadius} outerRadius={props.outerRadius}
                    cornerRadius={props.cornerRadius}>{props.children}</ArcPath>
}

class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1.0
        }
    }

    onMouseEnter() {
        console.log("Enter");
        this.setState({opacity: 0.5});
    }

    onMouseExit() {
        this.setState({opacity: 1.0});
    }

    render() {
        return <g className={"feature"} onMouseEnter={ () => {this.onMouseEnter()}} onMouseLeave={() => {this.onMouseExit()}}>
            <Arc path={this.props.path} fill={this.props.fill} opacity={this.state.opacity} cornerRadius={this.props.cornerRadius} start={this.props.start} end={this.props.end}
                 innerRadius={this.props.innerRadius} outerRadius={this.props.outerRadius}/>
        </g>;
    }

}


class Shell extends Component {
    constructor(props) {
        super(props);
    }

    renderChildren() {
        let delta = this.props.shellPadding + this.props.shellHeight;
        let innerRadius = this.props.shellOffset + this.props.radius + delta * this.props.shell;
        let outerRadius = innerRadius + this.props.shellHeight;
        return React.Children.map(this.props.children,
            child => {
                return React.cloneElement(child, {
                    cx: this.props.cx,
                    cy: this.props.cy,
                    context: this.props.context,
                    innerRadius: innerRadius,
                    outerRadius: outerRadius
                });
            }
        );
    }

    render() {
        return <g className={"shell"}>
            {this.renderChildren()}
        </g>
    }
}


class Shells extends Component {
    constructor(props) {
        super(props);
    }

    renderChildren() {
        return React.Children.map(this.props.children,
            child => {
                return React.cloneElement(child, {
                    cx: this.props.cx,
                    cy: this.props.cy,
                    context: this.props.context,
                    shellPadding: this.props.shellPadding,
                    shellHeight: this.props.shellHeight,
                    shellOffset: this.props.shellOffset,
                    radius: this.props.radius,
                });
            }
        );
    }

    render() {
        return <g transform={"translate(" + this.props.cx + "," + this.props.cy + ")"}>{this.renderChildren()}</g>
    }
}


function SVGGroup(props) {
    let children = React.Children.map(props.children,
        child => {
            return React.cloneElement(child, {...props})
        });
    return children
}


function Tick(props) {
    let x1 = props.innerRadius * Math.sin(props.theta);
    let y1 = props.innerRadius * Math.cos(props.theta);
    let x2 = props.outerRadius * Math.sin(props.theta);
    let y2 = props.outerRadius * Math.cos(props.theta);

    let label = <text x={x1} y={y1} textAncor={'middle'} alignmentBaseline={'middle'}>{props.label}</text>

    return <g className={"tick"}>
            <line x1={x1} y1={y1} x2={x2} y2={y2}
                 stroke={"black"}
                 stroke-weight={0.25}/>
        {label}</g>;
}


function Axis(props) {

    let ticks = [];
    for (let i = 0; i < props.ticks; i += 1) {
        let theta = Math.PI * 2.0 / props.ticks * i;
        let tick = <Tick theta={theta} />;
        ticks.push(tick);
    }

    return <Shells cx={props.cx} cy={props.cy} radius={props.radius} className={"axes"} shellPadding={0}
                   shellHeight={props.tickHeight} shellOffset={props.tickOffset} context={props.context}>
        <Shell className={"axis"} shell={props.shell}>
            {ticks}
        </Shell>
    </Shells>
}

function AxisLabels(props) {

    let ticks = [];
    for (let l = 0; l < props.labels.length; l += 1) {
        let label = Math.round(props.labels[l]);
        let theta = label * 2.0 * Math.PI / props.context;
        console.log(theta);
        console.log(label);
        let tick = <Tick theta={0.25} label={label} />;
        ticks.push(tick);
    }

    return <Shells cx={props.cx} cy={props.cy} radius={props.radius} className={"axes"} shellPadding={0}
                   shellHeight={props.tickHeight} shellOffset={props.tickOffset} context={props.context}>
        <Shell className={"axis"} shell={props.shell}>
            {ticks}
        </Shell>
    </Shells>
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

        return <PlasmidPath cx={cx} cy={cy}
                            context={this.props.context} radius={this.props.radius}
                            spineWidth={this.props.spineWidth} width={this.props.width}
                            height={this.props.height}>
            <Shells shellPadding={3} shellHeight={10} shellOffset={10}>
                <Shell shell={0}>
                    <FeaturePath start={6000} end={8000}>
                        <Feature fill={'yellow'} cornerRadius={3.0}/>
                    </FeaturePath>
                    <FeaturePath start={2000} end={5000}>
                        <Feature fill={'purple'} cornerRadius={3.0}/>
                    </FeaturePath>
                </Shell>
                <Shell shell={1}>
                    <FeaturePath start={2500} end={4000}>
                        <Feature fill={'blue'} cornerRadius={3.0}/>
                    </FeaturePath>
                </Shell>
            </Shells>
            <SVGGroup shell={-2} tickOffset={0}>
                <Axis className="minor" ticks={200} tickHeight={10} />
                <Axis className="major" ticks={10} tickHeight={20}/>
                <AxisLabels labels={range(0, this.props.context, this.props.context / 10)}/>
            </SVGGroup>
        </PlasmidPath>;
    }
}

export default Plasmid