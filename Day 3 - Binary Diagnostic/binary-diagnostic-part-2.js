const fs = require("fs");

/**
 * 
 * @param {Array} input 
 * @param {int} index 
 */
const getMostCommonBinary = (input, index) => {
    let items = [];

    input.forEach(x => {
        var chars = [...x];
        items.push(chars);
    });

    var zeroCount = items.filter(x => x[index] === '0').length;
    var oneCount = items.filter(x => x[index] === '1').length;

    var mostCommonBinarys;

    if (zeroCount > oneCount) {
        mostCommonBinarys = items.filter(x => x[index] === '0');
    } else if (oneCount > zeroCount) {
        mostCommonBinarys = items.filter(x => x[index] === '1');
    } else {
        mostCommonBinarys = items.filter(x => x[index] === '1');
    }

    if (mostCommonBinarys.length === 1) {
        return mostCommonBinarys.map(x => x.join(''))[0];
    }

    return getMostCommonBinary(mostCommonBinarys.map(x => x.join('')), ++index) 
};

/**
 * 
 * @param {Array} input 
 * @param {int} index 
 */
 const getLeastCommonBinary = (input, index) => {
    let items = [];

    input.forEach(x => {
        var chars = [...x];
        items.push(chars);
    });

    var zeroCount = items.filter(x => x[index] === '0').length;
    var oneCount = items.filter(x => x[index] === '1').length;

    var leastCommonBinarys;

    if (zeroCount < oneCount) {
        leastCommonBinarys = items.filter(x => x[index] === '0');
    } else if (oneCount < zeroCount) {
        leastCommonBinarys = items.filter(x => x[index] === '1');
    } else {
        leastCommonBinarys = items.filter(x => x[index] === '0');
    }

    if (leastCommonBinarys.length === 1) {
        return leastCommonBinarys.map(x => x.join(''))[0];
    }

    return getLeastCommonBinary(leastCommonBinarys.map(x => x.join('')), ++index) 
};

(() => {
    let text = fs.readFileSync("./input/input.txt", "utf-8");
    let textByLine = text.split("\r\n");

    let uniqueBinarys =  [...new Set(textByLine)]

    let oxygenGeneratorRating = getMostCommonBinary(uniqueBinarys, 0);
    let co2ScrubberRating = getLeastCommonBinary(uniqueBinarys, 0);

    console.log(oxygenGeneratorRating);
    console.log(co2ScrubberRating);

    let lifeSupportRating = parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);

    console.log(lifeSupportRating);
})();