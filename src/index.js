function getConfig(bracket, config) {
    for (let brackets of config) {
        if (brackets.includes(bracket)) {
            return brackets;
        }
    }
    return null;
}

module.exports = function check(str, bracketsConfig) {
    let openedBrackets = [];

    for (let bracket of str) {
        let [openingBracket, closingBracket] = getConfig(bracket, bracketsConfig);
        let prevOpenedBracket = openedBrackets[openedBrackets.length - 1];

        if (openingBracket === closingBracket) {
            if (!openedBrackets.includes(bracket)) {
                openedBrackets.push(bracket);
                continue;
            }

            if (openedBrackets.includes(bracket) && prevOpenedBracket === bracket) {
                openedBrackets.pop();
                continue;
            }

            if (prevOpenedBracket !== bracket) {
                return false;
            }
        }

        if (closingBracket === bracket) {
            if (openedBrackets.length === 0) {
                return false;
            }

            if (prevOpenedBracket === openingBracket) {
                openedBrackets.pop();
            } else {
                return false;
            }
        }

        if (openingBracket === bracket) {
            openedBrackets.push(bracket);
        }
    }

    return openedBrackets.length === 0;
};
