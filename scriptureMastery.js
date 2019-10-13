const rp = require('request-promise');
const $ = require('cheerio');
const scriptures = {
  'NT': [
    'Matthew 5:14-16',
    'Matthew 11:28-30',
    'Matthew 16:15-19',
    'Matthew 22:36-39',
    'Luke 24:36-39',
    'John 3:5',
    'John 7:17',
    'John 14:15',
    'John 15:16',
    'John 17:3',
  ]
};

// Get one scripture and count words
const baseUrl = `https://www.churchofjesuschrist.org/study/scriptures/nt/matt/16?lang=eng`;

// Cycle through each scripture, make a request to churchofjesuschrist.org and get the word count for each
// Use async await?
// use cheerio?