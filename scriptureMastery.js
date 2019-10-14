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

function getWordCount(scriptureNum) {
  const scripture = scriptures.NT[scriptureNum];
  const book = scripture.split(' ')[0].slice(0, 4).toLowerCase();
  const chapter = scripture.split(' ')[1].split(':')[0];
  const verses = scripture.split(' ')[1].split(':')[1].split('-');
  const versesStart = parseInt(verses[0]);
  const versesEnd = verses.length > 1 ? parseInt(verses[1]) : versesStart;
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
      let scriptureText = '';
      for (let i = versesStart; i <= versesEnd; i++) {
        scriptureText += $(`#p${i}.verse`).text().split(' ').slice(1).join(' ') + ' ';
      }
      const wordCount = scriptureText.split(' ').length;
      const characterCount = scriptureText.split('').length;
      console.log(`${scripture}: ${wordCount} words, ${characterCount} characters`);
    })
    .catch(function(err){
      //handle error
    });
}

for (let i = 0; i < scriptures.NT.length; i++) {
  getWordCount(i);
}