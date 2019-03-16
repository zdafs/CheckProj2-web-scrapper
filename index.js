const { jbcScrapper, newpopScrapper, paniniScrapper } = require('./web_scrappers');
const { MONTHS, PUBLISHERS } = require('./constants');

const publisher = process.argv[2];
const url = process.argv[3];
const month = process.argv[4];

scrapperFunctions = {};
scrapperFunctions[PUBLISHERS.JBC] = jbcScrapper;
scrapperFunctions[PUBLISHERS.NEW_POP] = newpopScrapper;
scrapperFunctions[PUBLISHERS.PANINI] = paniniScrapper;

scrapperFunctions[publisher](url, month);
