const fs = require("fs");

(() => {
    let text = fs.readFileSync("./input/input.txt", "utf-8");
    let textByLine = text.split("\r\n");

    let gammaRate = '';
    let epsilonRate = '';

    let items = [];

    textByLine.forEach(x => {
        var chars = [...x];
        chars.forEach((c, i) => {
            if (typeof(items[i]) === 'undefined') {
                items[i] = [];
            }

            items[i].push(c);
        });
    });

    items.forEach(element => {
        var zeroCount = element.filter(x => x === '0').length;
        var oneCount = element.filter(x => x === '1').length;

        if (zeroCount > oneCount) {
            gammaRate += '0';
            epsilonRate += '1';
        } else {
            gammaRate += '1';
            epsilonRate += '0';
        }
    });

    console.log(gammaRate);
    console.log(epsilonRate);

    console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));

})();