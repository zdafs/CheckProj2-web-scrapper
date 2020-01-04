// const { jbcScrapper, newpopScrapper, paniniScrapper } = require('./web_scrappers');
const { MONTHS, PUBLISHERS } = require('./constants');

// const publisher = process.argv[2];
// const url = process.argv[3];
// const month = process.argv[4];

// scrapperFunctions = {};
// scrapperFunctions[PUBLISHERS.JBC] = jbcScrapper;
// scrapperFunctions[PUBLISHERS.NEW_POP] = newpopScrapper;
// scrapperFunctions[PUBLISHERS.PANINI] = paniniScrapper;

// scrapperFunctions[publisher](url, month);

const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

const validURL = (str) => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

const questions = [
  {
    name: 'publisher',
    type: 'list',
    message: "What's the publisher name?",
    choices: [
      {
        name: 'JBC',
        value: PUBLISHERS.JBC,
      },
      {
        name: 'Panini',
        value: PUBLISHERS.PANINI,
      },
      {
        name: 'New Pop',
        value: PUBLISHERS.NEW_POP,
      },
    ],
  },
  {
    name: 'month',
    type: 'rawlist',
    message: "What's the checklist's release month?",
    choices: [
      {
        name: MONTHS[1],
        value: 1
      },
      {
        name: MONTHS[2],
        value: 2
      },
      {
        name: MONTHS[3],
        value: 3
      },
      {
        name: MONTHS[4],
        value: 4
      },
      {
        name: MONTHS[5],
        value: 5
      },
      {
        name: MONTHS[6],
        value: 6
      },
      {
        name: MONTHS[7],
        value: 7
      },
      {
        name: MONTHS[8],
        value: 8
      },
      {
        name: MONTHS[9],
        value: 9
      },
      {
        name: MONTHS[10],
        value: 10
      },
      {
        name: MONTHS[11],
        value: 11
      },
      {
        name: MONTHS[12],
        value: 12
      },
    ],
  },
  {
    name: 'url',
    type: 'input',
    message: "What's the checklist URL?",
    validate: (value) => {
      if (value.length && validURL(value)) {
        return true;
      }
      return 'Please enter a valid URL.';
    }
  },
];

const run = async () => {
  clear();

  console.log(
    chalk.yellow(
      figlet.textSync('CWS', { horizontalLayout: 'full' })
    )
  );
  
  const answers = await inquirer.prompt(questions);
  console.log(answers);
};

run();
