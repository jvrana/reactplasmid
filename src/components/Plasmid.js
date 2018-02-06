import React, {Component} from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import {Shell, Shells} from '../components/Shell.js';
import {Feature, Highlight} from '../components/Feature.js';
import {AxisLabels, Axis} from '../components/Axis.js';

let randomColor = require('randomcolor');


function PlasmidPath(props) {
    let x = props.width / 2.0, y = props.height / 2.0;
    let children = React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            context: props.context,
            radius: props.radius,
        })
    });

    let stylesheet = () => {
        return {__html: "<?xml-stylesheet type=\"text/css\" href=\"svg-stylesheet.css\" ?>"}
    };

    return <svg width={props.width} height={props.height}>
        {/*xmlns="http://www.w3.org/2000/svg"*/}
        {/*xmlnsXlink="http://www.w3.org/1999/xlink">*/}
        {/*<style>*/}
        {/*{ `circle.spine { fill:none }` }*/}
        {/*</style>*/}
        <g transform={"translate(" + x + "," + y + ")"}>
            {children}
            <circle
                className="spine"
                cx={0}
                cy={0}
                r={props.radius}
                fill='none'
                stroke={props.spineStroke}
                strokeWidth={props.spineWidth}
            />
        </g>
    </svg>;
}


class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offsetX: 0,
            offsetY: 0,
            x: 0,
            y: 0,
        };
        // this.onMouseEnter = this.onMouseEnter.bind(this);
        // this.onMouseMove = this.onMouseMove.bind(this);
    }

    // onMouseEnter(e) {
    //     this.setState({
    //         offsetX: e.pageX,
    //         offsetY: e.pageY,
    //     })
    // }
    //
    // onMouseMove(e) {
    //
    // }

    render() {
        let cx = this.props.width;
        let cy = this.props.height;
        let r, theta;
        let x = this.props.position.x - cx;
        let y = this.props.position.y - cy;
        // [r, theta] = cartesian2polar(x, y);
        // [x, y] = polar2cartesian(this.props.radius, theta);
        return <line x1={0} y1={0} x2={x} y2={y} stroke={'black'} strokeWidth={1}/>
    }
}


class Plasmid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0, y: 0,
            colors: randomColor({luminosity: 'light', count: 20})
        };
    }


    static propTypes = {
        context: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
        spineWidth: PropTypes.number.isRequired,
        spineStroke: PropTypes.number,
        minorTicks: PropTypes.number,
        majorTicks: PropTypes.number,
        minorTickHeight: PropTypes.number,
        majorTickHeight: PropTypes.number,
        minorTickWidth: PropTypes.number,
        majorTickWidth: PropTypes.number,
        minorTickStroke: PropTypes.string,
        majorTickStroke: PropTypes.string,
        minorTickOffset: PropTypes.number,
        majorTickOffset: PropTypes.number,
        axisLabelOffset: PropTypes.number,
        tickLabelFontSize: PropTypes.number,
        nameFontSize: PropTypes.number,
        infoFontSize: PropTypes.number,

        // features
        featureData: PropTypes.arrayOf(Object).isRequired,
        featureCornerRadius: PropTypes.number,
        featureStroke: PropTypes.number,
        featureStrokeWidth: PropTypes.number,
        shellPadding: PropTypes.number,
        shellHeight: PropTypes.number,
        shellOffset: PropTypes.number,
    };

    static defaultProps = {
        // spine
        spineStroke: 'black',

        // axis
        minorTicks: 100,
        majorTicks: 10,
        minorTickHeight: -10,
        majorTickHeight: -20,
        minorTickWidth: 2,
        majorTickWidth: 2,
        minorTickStroke: 'black',
        majorTickStroke: 'black',
        minorTickOffset: 0,
        majorTickOffset: 0,
        axisLabelOffset: -30,
        tickLabelFontSize: 15,

        // name
        nameFontSize: 20,
        infoFontSize: 12,

        // features
        featureCornerRadius: 10.0,
        featureStroke: 'black',
        featureStrokeWidth: 1,
        shellPadding: 5,
        shellHeight: 20,
        shellOffset: 10,
    };

    sortFeatureData(featureData) {
        function len(feature) {
            if (feature.end >= feature.start) {
                return feature.end - feature.start;
            } else {
                return feature.end + this.props.context - feature.start;
            }
        }

        len = len.bind(this);

        featureData.sort((a, b) => {
            return len(a) - len(b)
        });
        console.log(featureData.map((o, i) => {
            console.log(len(o))
        }));
        return featureData.reverse();

    }

    renderFeatures(featureData) {
        this.sortFeatureData(featureData);

        let shells = [];
        for (let i = 0, data; data = featureData[i]; i++) {
            let shellNum = 0;
            let assignedShell = false;
            console.log("Feature...");
            console.log(data);
            while (!assignedShell && shellNum < shells.length) {
                const features = shells[shellNum];
                let featureNum = 0;
                let passed = true;
                console.log("Shell");
                console.log(shellNum);
                console.log(features);
                while (passed && featureNum < features.length) {
                    const feature = features[featureNum];
                    let _start = feature.start;
                    let _end = feature.end;
                    let operator = (a, b) => { return a && b };
                    if (_start > _end) {
                        operator = (a, b) => { return a || b };
                    }
                    console.log(_start, data.start, data.end, _end);
                    if (operator(_start <= data.start, data.start <= _end) || operator(_start <= data.end, data.end <= _end)) {
                            console.log("Did not pass");
                            console.log(_start <= data.start <= _end);
                            console.log(_start, data.start, data.end, _end);
                            passed = false;
                        }
                    featureNum++;
                }
                assignedShell = passed;
                shellNum++;
            }
            if (!assignedShell) {
                shells.push([])
            } else {
                shellNum--;
            }
            console.log("Assigning feature to shell " + shellNum);
            shells[shellNum].push(data);
        }

        return <Shells shellPadding={this.props.shellPadding}
                       shellHeight={this.props.shellHeight}
                       shellOffset={this.props.shellOffset}>
            {
                shells.map((features, s) => {
                    console.log(features);
                    return <Shell shell={s}>
                        {features.map((data, f) => {
                            console.log(data);
                            return <Feature
                                cornerRadius={this.props.featureCornerRadius}
                                stroke={this.props.featureStroke}
                                strokeWidth={this.props.featureStrokeWidth}
                                {...data}/>
                        })}
                    </Shell>
                })
            }
        </Shells>
    }

    render() {
        let cx = this.props.width / 2.0;
        let cy = this.props.height / 2.0;

        return <PlasmidPath cx={cx} cy={cy}
                            context={this.props.context} radius={this.props.radius}
                            spineWidth={this.props.spineWidth} spineStroke={this.props.spineStroke}
                            width={this.props.width}
                            height={this.props.height}>
            <text textAnchor={'middle'} fontSize={this.props.nameFontSize}
                  fontFamily={"Verdana"}>{this.props.name}</text>
            <text y={20} textAnchor={'middle'} fontSize={this.props.infoFontSize}
                  fontFamily={"Verdana"}>{this.props.context + "bp"}</text>
            {this.renderFeatures(this.props.featureData)}
            <Axis r={this.props.radius + this.props.minorTickOffset} ticks={this.props.minorTicks} tickHeight={this.props.minorTickHeight}
                  stroke={this.props.minorTickStroke} weight={this.props.minorTickWidth}/>
            <Axis r={this.props.radius + this.props.majorTickOffset} ticks={this.props.majorTicks} tickHeight={this.props.majorTickHeight}
                  stroke={this.props.majorTickStroke} weight={this.props.majorTickWidth}/>
            <AxisLabels ticks={this.props.majorTicks} context={this.props.context} r={this.props.radius} axisLabelOffset={this.props.axisLabelOffset}
                        fontSize={this.props.tickLabelFontSize}
                        fontFamily={"sans-serif"} inside={this.props.axisLabelInside}/>
        </PlasmidPath>

    }
}

PlasmidPath.propTypes = {
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    context: PropTypes.number.isRequired,
};

export default Plasmid