const rp = require('request-promise');
const $ = require('cheerio');
const saveInMonth = require('./utils/saveInMonth');

const baseUrl = 'https://loja.panini.com.br';

const addMangasToArray = (mangas, html) => {
    const mangasSelector = $('.row', html).find('.description > h4 > a');
    const mangasLength = mangasSelector.length;

    for(let i=0; i<mangasLength; i++){
        mangas.push(mangasSelector[i].children[0].data);
    }
};

const paniniScrapper = (url, month) =>
    rp(url)
    .then((html) => {
        const urls = [url]

        const pagSelector = $('.results > #ConteudoBodyMaster_ConteudoCorpo_CtlResultadoBusca_DataPager1 > a.pagingLink', html);
        const pagQuant = pagSelector.length;
        for(let i=0; i<pagQuant; i++){
            url = baseUrl + pagSelector[i].attribs.href;
            urls.push(url);
        }
        return urls;
    })
    .then((urls) => {
        const promises = [];

        urls.forEach((url) => {
            promises.push(rp(url));
        });

        Promise.all(promises)
            .then((responses) => {
                const mangas = [];

                responses.forEach((html) => {
                    addMangasToArray(mangas, html);
                });

                return mangas;
            })
            .then((mangas) => saveInMonth(mangas, month))
            .catch((err) => console.log(err));
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = paniniScrapper;
