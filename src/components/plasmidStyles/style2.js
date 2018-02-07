let randomColor = require('randomcolor');


let minorTickStyle = {
    minorTicks: 100,
    minorTickHeight: -15,
    minorTickOffset: 0,
    minorTickStroke: 'black',
    minorTickWidth: 0.5,
};

let majorTickStyle = {
    majorTicks: 10,
    majorTickHeight: -20,
    majorTickOffset: 0,
    majorTickStroke: "blue",
    majorTickWidth: 3,
    axisLabelOffset: -25,
    tickLabelFontSize: 10,
};

let featureStyle = {
    shellHeight: -7,
    featureCornerRadius: 1,
    shellOffset: -60,
    shellPadding: -5,
    featureStrokeWidth: 1,
    featureStroke: 'black',
    featureRandomColorGenerator: () => {
        return randomColor({luminosity: 'bright'})
    }
};

let spineStyle = {
    spineStroke: 'gray',
    spineWidth: 3.0,
};


let labelStyle = {
    nameFontSize: 30,
    infoFontSize: 15,
};

let plasmidStyle = {
    featureStyle: featureStyle,
    labelStyle: labelStyle,
    minorTickStyle: minorTickStyle,
    majorTickStyle: majorTickStyle,
    spineStyle: spineStyle,
};

export { plasmidStyle };