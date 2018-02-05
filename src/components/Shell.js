import PropTypes from "prop-types";
import React, {Component} from "react";

function Shell(props) {
    let delta = props.shellPadding + props.shellHeight;
    let innerRadius = props.shellOffset + props.radius + delta * props.shell;
    let outerRadius = innerRadius + props.shellHeight;
    return React.Children.map(props.children,
        child => {
            return React.cloneElement(child, {
                cx: props.cx,
                cy: props.cy,
                context: props.context,
                innerRadius: innerRadius,
                outerRadius: outerRadius
            });
        }
    );
}

class Shells extends Component {
    constructor(props) {
        super(props);
        console.log(props.children)
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
        return <g className={"shellgroup"}>{this.renderChildren()}</g>
    }
}

Shell.propTypes = {
    shellPadding: PropTypes.number,
    shellHeight: PropTypes.number,
    radius: PropTypes.number,
    shellOffset: PropTypes.number,
    cx: PropTypes.number,
    cy: PropTypes.number,
    context: PropTypes.number,
};


Shells.propTypes = {
    shellPadding: PropTypes.number.isRequired,
    shellHeight: PropTypes.number.isRequired,
    radius: PropTypes.number,
    shellOffset: PropTypes.number,
    cx: PropTypes.number,
    cy: PropTypes.number,
    context: PropTypes.number,
};

export {Shell, Shells};