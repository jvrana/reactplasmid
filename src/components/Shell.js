import PropTypes from "prop-types";
import React, {Component} from "react";

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
        return <g>{this.renderChildren()}</g>
    }
}

Shell.propTypes = {
    shellPadding: PropTypes.number.isRequired,
    shellHeight: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequirec,
    shellOffset: PropTypes.number,
    cx: PropTypes.number.cx,
    cy: PropTypes.number.cy,
    context: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
};


Shells.propTypes = {
    shellPadding: PropTypes.number.isRequired,
    shellHeight: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequirec,
    shellOffset: PropTypes.number,
    cx: PropTypes.number.cx,
    cy: PropTypes.number.cy,
    context: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
};

export { Shell, Shells };