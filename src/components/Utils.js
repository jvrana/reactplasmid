import React, { Component } from "react";


class Transform extends Component {
    constructor(props) {
        super(props);
    }

    renderChildren() {
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {...this.props})
        });
    }

    render() {
        return <g transform={"translate(" + this.props.cx + "," + this.props.cy + ")"}>
            {this.renderChildren()}
        </g>;
    }
}

function SVGGroup(props) {
    let children = React.Children.map(props.children,
        child => {
            return React.cloneElement(child, {...props})
        });
    return children
}

export { Transform, SVGGroup}