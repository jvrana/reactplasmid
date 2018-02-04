import React, {Component} from 'react';
import './App.css';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import ReactCursorPosition from 'react-cursor-position';


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
                 stroke-weight={30}/>
}


function FeaturePath(props) {
    let start = 2.0 * Math.PI * props.start / props.context;
    let end = 2.0 * Math.PI * props.end / props.context;
    return <ArcPath start={start} end={end} innerRadius={props.innerRadius} outerRadius={props.outerRadius}
                    cornerRadius={props.cornerRadius}>{props.children}</ArcPath>
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


function Axis(props) {

    let ticks = [];
    let majorTicks = [];
    for (let i = 0; i < props.ticks; i += 1) {
        let start = Math.PI * 2.0 / props.ticks * i;
        let end = start * 1.000001;
        let tick = <ArcPath className={"tick"} start={start} end={end}>
            <Arc fill={"white"}
                 stroke={"black"}
                 stroke-weight={0.25}/>
        </ArcPath>;
        ticks.push(tick);
    }

    return <Shells cx={props.cx} cy={props.cy} radius={props.radius} className={"axes"} shellPadding={0}
                   shellHeight={props.tickHeight} shellOffset={props.tickOffset}>
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
                    <ArcPath start={0} end={0.5}>
                        <Arc fill={'none'} cornerRadius={3.0}/>
                    </ArcPath>
                    <FeaturePath start={2000} end={5000}>
                        <Arc fill={'none'} cornerRadius={3.0}/>
                    </FeaturePath>
                </Shell>
                <Shell shell={1}>
                    <FeaturePath start={2500} end={4000}>
                        <Arc fill={'none'} cornerRadius={3.0}/>
                    </FeaturePath>
                </Shell>
            </Shells>
            <Axis ticks={200} tickHeight={10} tickOffset={0} shell={-1}/>
            <Axis ticks={10} tickHeight={20} tickOffset={0} shell={-2}/>
        </PlasmidPath>;
    }
}

export default Plasmid