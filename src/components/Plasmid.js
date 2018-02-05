import React, {Component} from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Shell, Shells } from '../components/Shell.js';
import { FeaturePath, Feature } from '../components/Feature.js';
import { AxisLabels, Axis } from '../components/Axis.js';
import { Transform } from '../components/Utils.js';

let randomColor = require('randomcolor');


function SVGGroup(props) {
    let children = React.Children.map(props.children,
        child => {
            return React.cloneElement(child, {...props})
        });
    return children
}


class PlasmidPath extends Component {
    constructor(props) {
        super(props);
    }

    renderChildren() {
        return React.Children.map(this.props.children, child => {
            if (child.type.prototype instanceof Component) {
                return React.cloneElement(child, {
                    cx: this.props.width / 2.0,
                    cy: this.props.height / 2.0,
                    context: this.props.context,
                    radius: this.props.radius,
                })
            }
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
                strokeWidth={this.props.spineWidth}
            />
            {this.renderChildren()}</svg>;
    }
};


function Highlight(props) {
    return <Shells shellPadding={0} shellHeight={props.radius} shellOffset={0}>
        <Shell shell={0}>
            <FeaturePath start={props.start} end={props.end} cornerRadius={3.0}>
                <Feature fill={randomColor({luminosity: 'light'})} opacity={0.1}/>
            </FeaturePath>
        </Shell>
    </Shells>
}


class Plasmid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cx = this.props.width / 2.0;
        let cy = this.props.height / 2.0;
        return <PlasmidPath cx={cx} cy={cy}
                            context={this.props.context} radius={this.props.radius}
                            spineWidth={this.props.spineWidth} width={this.props.width}
                            height={this.props.height}>
            <Transform>
                <Shells key={"shells1"} shellPadding={5} shellHeight={15} shellOffset={10}>
                    <Shell shell={0}>
                        <FeaturePath start={6000} end={8000} cornerRadius={3.0}>
                            <Feature fill={randomColor({luminosity: 'light'})}/>
                        </FeaturePath>
                        <FeaturePath start={2000} end={5000} cornerRadius={3.0}>
                            <Feature fill={randomColor({luminosity: 'light'})}/>
                        </FeaturePath>
                    </Shell>
                    <Shell shell={1}>
                        <FeaturePath start={0} end={4000} cornerRadius={3.0}>
                            <Feature fill={randomColor({luminosity: 'light'})}/>
                        </FeaturePath>
                    </Shell>
                </Shells>
                <Highlight start={0} end={100} radius={this.props.radius} />
                <Axis r={this.props.radius} ticks={100} tickHeight={-10} stroke={'black'} weight={2.0}/>
                <Axis r={this.props.radius} ticks={10} tickHeight={-20} stroke={'black'} weight={2.0}/>
                <AxisLabels ticks={10} context={this.props.context} r={this.props.radius - 24.0} size={12} font={"sans-serif"}/>
                <text textAnchor={'middle'} fontSize={20} fontFamily={"Verdana"}>pMOD-LTR2-Bleo-pGRR_ij-RGR_k</text>
                <text y={20} textAnchor={'middle'} fontSize={15} fontFamily={"Verdana"}>{this.props.context + "bp"}</text>
            </Transform>
        </PlasmidPath>;
    }
}


PlasmidPath.propTypes = {
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    context: PropTypes.number.isRequired,
};

Plasmid.propTypes = {
    context: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    spineWidth: PropTypes.number.isRequired,
};

export default Plasmid