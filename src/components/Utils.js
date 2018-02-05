import React, { Component } from "react";


class Transform extends Component {
    constructor(props) {
        super(props);
    }

    renderChildren() {
        return React.Children.map(this.props.children, child => {
            let passedProps = Object.assign({}, this.props);
            delete passedProps.children;
            return React.cloneElement(child, {...passedProps})
        });
    }

    render() {
        return <g transform={"translate(" + this.props.cx + "," + this.props.cy + ")"}>
            {this.renderChildren()}
        </g>;
    }
}

export { Transform }