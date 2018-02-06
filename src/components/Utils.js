
// rotate counter clockwise 90 deg
function originScale(theta, offset) {
    return -offset - theta;
}

// where 12'oclock is theta=0rad
function cartesian2polar(x, y) {
    const theta = Math.atan(y/x);
    const r = y/Math.sin(theta);
    return [r, originScale(theta, -0.5*Math.PI)]
}

function polar2cartesian(r, theta) {
    // theta = originScale(theta, 0.5*Math.PI);
    const x = r * Math.sin(theta);
    const y = r * Math.cos(theta);
    return [x, -y]
}

function _to2PI(theta) {
    let remainder = theta % 2*Math.PI;
    return theta - remainder
}

function theta2position(theta, context) {
    return context * _to2PI(theta) / 2 * Math.PI
}

function position2theta(pos, context) {
    return 2 * Math.PI * pos / context;
}

function position2cartesian(pos, context, radius) {
    const theta = position2theta(pos, context);
    return polar2cartesian(radius, theta);
}

function cartesian2position(x, y, context) {
    let r, theta;
    [r, theta] = cartesian2polar(x, y);
    const pos = theta2position(theta, context);
    return [r, pos];
}

export {cartesian2polar, polar2cartesian, position2cartesian, cartesian2position, position2theta, theta2position}