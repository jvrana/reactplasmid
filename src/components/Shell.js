import PropTypes from "prop-types";
import React from "react";

function Shell(props) {
    let delta = props.shellPadding + props.shellHeight;
    let innerRadius = props.shellOffset + props.radius + delta * props.shell;
    let outerRadius = innerRadius + props.shellHeight;
    return React.Children.map(props.children,
        child => {
            return React.cloneElement(child, {
                context: props.context,
                innerRadius: innerRadius,
                outerRadius: outerRadius,
                radius: props.radius,
            });
        }
    );
}



function Shells(props) {
    const children = React.Children.map(props.children,
            child => {
                if (child.type === Shell) {
                    return React.cloneElement(child, {
                        context: props.context,
                        shellPadding: props.shellPadding,
                        shellHeight: props.shellHeight,
                        shellOffset: props.shellOffset,
                        radius: props.radius,
                    });
                }
            }
        );

    return <g className={"shellgroup"}>{children}</g>
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