let randomColor = require('randomcolor');


let minorTickStyle = {
    minorTicks: 0,
    minorTickHeight: -15,
    minorTickOffset: 0,
    minorTickStroke: 'black',
    minorTickWidth: 0.5,
};

let majorTickStyle = {
    majorTicks: 10,
    majorTickHeight: -20,
    majorTickOffset: 0,
    majorTickStroke: "black",
    majorTickWidth: 7,
    axisLabelOffset: -25,
    tickLabelFontSize: 0,
};

let featureStyle = {
    shellHeight: -15,
    featureCornerRadius: 1,
    shellOffset: -30,
    shellPadding: -10,
    featureStrokeWidth: 5,
    featureStroke: 'black',
    featureRandomColorGenerator: () => { return 'white' }
};

let spineStyle = {
    spineStroke: 'black',
    spineWidth: 15.0,
};


let labelStyle = {
    nameFontSize: 0,
    infoFontSize: 0,
};

let plasmidStyle = {
    featureStyle: featureStyle,
    labelStyle: labelStyle,
    minorTickStyle: minorTickStyle,
    majorTickStyle: majorTickStyle,
    spineStyle: spineStyle,
};

export { plasmidStyle };