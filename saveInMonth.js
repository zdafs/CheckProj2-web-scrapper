const fs = require('fs');
const MONTHS = require('./constants');

const saveInMonth = (mangas, month) => {
    const file = fs.createWriteStream(`checklists/${MONTHS[month]}.txt`, {flags: 'a'});
    mangas.forEach((manga) => {
        file.write(`${manga}\n`);
    });
    file.end();
}

module.exports = saveInMonth;
