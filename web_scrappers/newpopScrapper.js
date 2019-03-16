const rp = require('request-promise');
const $ = require('cheerio');
const saveInMonth = require('./utils/saveInMonth');

const newpopScrapper = (url, month) =>
    rp(url)
    .then((html) => {
        const selector = $('div[id^="attachment"] > p', html);
        const length = selector.length;
        const mangas = [];
        for(let i=0; i<length; i++){
            mangas.push(selector[i].children[0].data);
        }
        saveInMonth(mangas, month)
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = newpopScrapper;
