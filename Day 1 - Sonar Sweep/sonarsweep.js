const fs = require("fs");

(() => {
    let text = fs.readFileSync("./input/input.txt", "utf-8");
    let textByLine = text.split("\r\n")
    
    let increaseCount = 0;
    let previousValue = undefined;

    // an prefined array to store the sliding window 
    // this has 4 indices so that we can remove the next one 
    let threeMesurementSlidingWindow = [undefined, undefined, undefined, undefined]

    let currentIndex = 0;
  
    let functions = {
        calculateThreeMesurementSlidingWindow: () => {
            return threeMesurementSlidingWindow.filter(x => typeof(x) !== 'undefined').reduce((a, b) => a + b, 0);
        },
        getNextSlidingWindowIndex: (index) => {
            if (index > 3) {
                index = 0;
            }

            return index;
        },
        shouldCalculateSlidingWindow: () => {
            return threeMesurementSlidingWindow.filter(x => typeof(x) !== 'undefined').length === 3;
        }
    }

    textByLine.forEach((depth) => {
        // parse the depth to an int
        let iDepth = parseInt(depth);

        // work out what the next index will be 
        currentIndex = functions.getNextSlidingWindowIndex(currentIndex);

        // update the array for the current index
        threeMesurementSlidingWindow[currentIndex] = iDepth;
        
        // increment this after usage
        currentIndex++;

        // reset the next upcoming index
        threeMesurementSlidingWindow[functions.getNextSlidingWindowIndex(currentIndex)] = undefined;

        // we require at least 3 values to compare lets check that 
        if (!functions.shouldCalculateSlidingWindow()) {
            return;
        }

        // get the sum all the values in the window
        let value = functions.calculateThreeMesurementSlidingWindow();

        // we havent yet set a previous value lets do this, this wont increment the increase count
        if (typeof(previousValue) === 'undefined') {
            previousValue = value;
            return;
        }

        // check if our current value is greater than the previous if so lets increase it
        if (value > previousValue) {
            increaseCount++;
        }

        // set previous for the next iteration
        previousValue = value;

        return;
    });

    console.log(increaseCount);
})();