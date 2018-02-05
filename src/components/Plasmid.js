import React, {Component} from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Shell, Shells } from '../components/Shell.js';
import { Feature } from '../components/Feature.js';
import { AxisLabels, Axis } from '../components/Axis.js';
import { Transform } from '../components/Utils.js';

let randomColor = require('randomcolor');


function PlasmidPath(props) {
    let x = props.width/2.0, y = props.height/2.0;
    let children = React.Children.map(props.children, child => {
            return React.cloneElement(child, {
                    context: props.context,
                    radius: props.radius,
                })
        });

    return <svg width={props.width} height={props.height}>
            <g transform={"translate(" + x + "," + y + ")"}>
                <circle
                    className="spine"
                    cx={0}
                    cy={0}
                    r={props.radius}
                    stroke='black'
                    fill='none'
                    strokeWidth={props.spineWidth}
                />
                {children}
            </g></svg>;
}


// function Highlight(props) {
//     return <Shells shellPadding={0} shellHeight={props.radius} shellOffset={0}>
//         <Shell shell={0}>
//             <FeaturePath start={props.start} end={props.end} cornerRadius={3.0}>
//                 <Feature fill={randomColor({luminosity: 'light'})} opacity={0.1}/>
//             </FeaturePath>
//         </Shell>
//     </Shells>
// }


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
                <Shells key={"shells1"} shellPadding={5} shellHeight={15} shellOffset={10}>
                    <Shell shell={0}>
                        <Feature start={3000} end={5000} cornerRadius={3.0} fill={randomColor({luminosity: 'light'})}/>
                        <Feature start={6000} end={8000} cornerRadius={3.0} fill={randomColor({luminosity: 'light'})}/>
                    </Shell>
                    <Shell shell={1}>
                        <Feature start={0} end={4000} cornerRadius={3.0} fill={randomColor({luminosity: 'light'})}/>
                    </Shell>
                </Shells>
                {/*<Highlight start={0} end={100} radius={this.props.radius} />*/}
                <Axis r={this.props.radius} ticks={100} tickHeight={-10} stroke={'black'} weight={2.0}/>
                <Axis r={this.props.radius} ticks={10} tickHeight={-20} stroke={'black'} weight={2.0}/>
                <AxisLabels ticks={10} context={this.props.context} r={this.props.radius - 25.0} fontSize={12} fontFamily={"sans-serif"}/>
                <text textAnchor={'middle'} fontSize={20} fontFamily={"Verdana"}>pMOD-LTR2-Bleo-pGRR_ij-RGR_k</text>
                <text y={20} textAnchor={'middle'} fontSize={20} fontFamily={"Verdana"}>{this.props.context + "bp"}</text>
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