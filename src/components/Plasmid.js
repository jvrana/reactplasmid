import React, {Component} from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import {Shell, Shells} from '../components/Shell.js';
import {Feature, Highlight} from '../components/Feature.js';
import {AxisLabels, Axis} from '../components/Axis.js';
import {PositionLabel} from '../components/Axis.js';
import ReactCursorPosition from 'react-cursor-position';


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
        return { __html: "<?xml-stylesheet type=\"text/css\" href=\"svg-stylesheet.css\" ?>"}
    };

    return <svg width={props.width} height={props.height} xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink">
                <style>
                    { `circle.spine { fill:black }` }
                </style>
        <g transform={"translate(" + x + "," + y + ")"}>
            <circle
                className="spine"
                cx={0}
                cy={0}
                r={props.radius}
                fill='none'
                stroke={props.spineStroke}
                strokeWidth={props.spineWidth}
            />
            {children}
        </g>
    </svg>;
}

function Canvas(props) {
    console.log(props.position);
    return <rect x={0} y={0} width={props.width} height={props.height} stroke='none' fille='none'/>
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
    };

    static defaultProps = {
        spineStroke: 'black',
    };

    render() {
        let cx = this.props.width / 2.0;
        let cy = this.props.height / 2.0;
        return <PlasmidPath cx={cx} cy={cy}
                            context={this.props.context} radius={this.props.radius}
                            spineWidth={this.props.spineWidth} spineStroke={this.props.spineStroke} width={this.props.width}
                            height={this.props.height}>
            <Shells key={"shells1"} shellPadding={5} shellHeight={15} shellOffset={10}>
                <Shell shell={0}>
                    <Feature start={3000} end={5000} cornerRadius={3.0} fill={this.state.colors[0]}/>
                    <Feature start={6000} end={8000} cornerRadius={3.0} fill={this.state.colors[1]}/>
                </Shell>
                <Shell shell={1}>
                    <Feature start={0} end={4000} cornerRadius={3.0} fill={this.state.colors[2]}/>
                </Shell>
            </Shells>
            <Axis r={this.props.radius} ticks={100} tickHeight={-10} stroke={'black'} weight={2.0}/>
            <Axis r={this.props.radius} ticks={10} tickHeight={-20} stroke={'black'} weight={2.0}/>
            <AxisLabels ticks={10} context={this.props.context} r={this.props.radius - 25.0} fontSize={15}
                        fontFamily={"sans-serif"}/>
            <text textAnchor={'middle'} fontSize={20} fontFamily={"Verdana"}>{this.props.name}</text>
            <text y={20} textAnchor={'middle'} fontSize={12}
                  fontFamily={"Verdana"}>{this.props.context + "bp"}</text>
            <ReactCursorPosition cursorTag={'g'}>
                <rect x={0} y={0} width={this.props.width} height={this.props.height} fill={'none'} stroke={'none'}/>
            </ReactCursorPosition>
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