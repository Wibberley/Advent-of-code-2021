const bingoRow = require('./bingo-row');

module.exports = class bingoCard {
    #rows = [];
    #complete = false;
    #uid;

    constructor() {
        this.#uid = this.uuidv4();
    }

    get isComplete() {
        return this.#complete;
    }

    get uid() {
        return this.#uid;
    }

    addRow(row) {
        this.#rows.push(new bingoRow(row));
    }

    addNumber(number) {
        this.#rows.forEach(x => x.addNumber(number));
        return this;
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    checkCard() {
        if (this.#complete) {
            return this.#complete;
        }

        for (var i = 0; i < this.#rows.length; i++) {
            var row = this.#rows[i];
            if (row.completeRow) {
                this.#complete = true;
                break;
            }
        }

        if (this.#complete) {
            return this.#complete;
        }

        var columnCount = this.#rows[0].columns.length;

        for (var i = 0; i < columnCount; i++) {
            for (var r = 0; r < this.#rows.length; r++) {
                var row = this.#rows[r];
                if (!row.checkRowByIndex(i)) {
                    break;
                }

                if (r === columnCount - 1) {
                    this.#complete = true;
                    break;
                }
            }

            if (this.#complete) {
                break;
            }
        }

        return this.#complete;
    };

    getSumOfIncompleteNumber() {
        var numbers = [];
        this.#rows.forEach(element => {
            numbers = numbers.concat(element.columns.filter(x => x.state === 0));
        });

        const reducer = (previousValue, currentValue) => previousValue + currentValue;

        return numbers.map(x => x.value).reduce(reducer);
    }
};