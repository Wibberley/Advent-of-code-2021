const fs = require("fs");
const bingoCard = require('./bingo-card');

(() => {
    let text = fs.readFileSync("./input/input.txt", "utf-8");
    let textByLine = text.split("\r\n");

    var numbers = textByLine[0].split(',');

    var cards = [];

    var currentCard = new bingoCard();

    for (var i = 2; i < textByLine.length; i++) {
        var row = textByLine[i];

        if (row === '') {
            cards.push(currentCard);
            currentCard = new bingoCard();
            continue;
        }

        currentCard.addRow(row.split(' '));
    };

    cards.push(currentCard);

    var finalNumber;

    var completeCards = [];

    for (let number of numbers) {
        for (let card of cards) {
            var cardComplete = card.addNumber(number)
                .checkCard();

            if (cardComplete) {
                if (completeCards.filter(x => x === card).length === 0)
                    completeCards.push(card);
            }
        };

        finalNumber = number;

        if (completeCards.length === cards.length)
            break;
    };

    var result = completeCards[completeCards.length - 1].getSumOfIncompleteNumber() * finalNumber;

    console.log(result);
})();