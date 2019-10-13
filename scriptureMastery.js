const rp = require('request-promise');
const cheerio = require('cheerio');
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

const scripture = scriptures.NT[0];
const book = scripture.split(' ')[0].slice(0, 4).toLowerCase();
const chapter = scripture.split(' ')[1].split(':')[0];
const versesStart = parseInt(scripture.split(' ')[1].split(':')[1].split('-')[0]);
const versesEnd = parseInt(scripture.split(' ')[1].split(':')[1].split('-')[1]);
const baseUrl = `https://www.churchofjesuschrist.org/study/scriptures/nt/${book}/${chapter}?lang=eng`;
const options = {
  uri: baseUrl,
  transform: function (body) {
    return cheerio.load(body);
  }
};
// Get one scripture and count words
rp(options)
  .then(function($){
    //success!
    let scriptureText = '';
    for (let i = versesStart; i <= versesEnd; i++) {
      scriptureText += $(`#p${i}.verse`).text().split(' ').slice(1).join(' ') + ' ';
    }
    console.log(scriptureText);
  })
  .catch(function(err){
    //handle error
  });

// Cycle through each scripture, make a request to churchofjesuschrist.org and get the word count for each
// Use async await?
// use cheerio?