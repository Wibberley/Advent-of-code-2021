const fs = require("fs");

(() => {
    let text = fs.readFileSync("./input/input.txt", "utf-8");
    let textByLine = text.split("\r\n")

    let horizontalPosition = 0;
    let depthPosition = 0;
    let aim = 0;

    textByLine.forEach(x => {
        var values = x.split(' ');
        var direction = values[0];
        var amount = values[1];

        switch (direction) {
            case 'forward':
                horizontalPosition += parseInt(amount);
                depthPosition = depthPosition + (parseInt(amount) * aim); 
                break;
            case 'down':
                aim += parseInt(amount);
                break;
            case 'up':
                aim -= parseInt(amount);
                break;
        }
    });

    console.log(horizontalPosition * depthPosition);
})();