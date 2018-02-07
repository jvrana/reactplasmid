let randomColor = require('randomcolor');


let minorTickStyle = {
    minorTicks: 350,
    minorTickHeight: -30,
    minorTickOffset: 15,
    minorTickStroke: 'gray',
    minorTickWidth: 0.5,
};

let majorTickStyle = {
    majorTicks: 10,
    majorTickHeight: 20,
    majorTickOffset: 0,
    majorTickStroke: "black",
    majorTickWidth: 3,
    axisLabelOffset: 25,
    tickLabelFontSize: 10,
};

let featureStyle = {
    shellHeight: -12,
    featureCornerRadius: 5,
    shellOffset: -25,
    shellPadding: -5,
    featureStrokeWidth: 1,
    featureStroke: 'gray',
    featureRandomColorGenerator: () => {
        return randomColor({luminosity: 'light'})
    }
};

let spineStyle = {
    spineStroke: 'white',
    spineWidth: 10.0,
};


let labelStyle = {
    nameFontSize: 40,
    infoFontSize: 20,
};

let plasmidStyle = {
    featureStyle: featureStyle,
    labelStyle: labelStyle,
    minorTickStyle: minorTickStyle,
    majorTickStyle: majorTickStyle,
    spineStyle: spineStyle,
};

export { plasmidStyle };