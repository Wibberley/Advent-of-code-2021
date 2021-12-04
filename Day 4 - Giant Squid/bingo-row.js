module.exports = class bingoRow {
    #rowState;

    constructor(row) {
        this.#rowState = row.filter(x => x !== '').map(x => {
            return { value: parseInt(x), state: 0 }
        });
    }

    get completeRow() {
        return this.#rowState.filter(x => x.state === 0).length === 0;
    }

    get columns() {
        return this.#rowState;
    }

    addNumber(number) {
        this.#rowState.forEach(x => {
            if (x.value === parseInt(number)) {
                x.state = 1;
            }
        });
    }

    checkRowByIndex(index) {
        return this.#rowState[index].state === 1;
    }
};