const rp = require('request-promise');
const $ = require('cheerio');
const saveInMonth = require('./saveInMonth');

const url = process.argv[2];
const month = process.argv[3];

rp(url)
    .then((html) => {
        const selector = $('.checklist', html).first().find('li > a');
        const length = selector.length;
        const mangas = []
        for(let i=0; i<length; i++){
            mangas.push(selector[i].children[1].data);
        }
        saveInMonth(mangas, month);
    })
    .catch((err) => {
        console.log(err);
    });
