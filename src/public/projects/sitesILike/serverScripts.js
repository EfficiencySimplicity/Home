// https://www.npmjs.com/package/rss-parser
// The demo shows reddit as an example...

const Parser = require('rss-parser');
const parser = new Parser();

async function readUpdate(url) {
  // if type is rss, etc.
  let feed = await parser.parseURL(url);
  return feed;
}

function scriptApp(app) {
  app.get('/projects/sitesilike/reader', (req, res) => {
    console.log('SitesILike request recieved');
    readUpdate(req.query.url)
    .then((result) => {
      res.json({url: req.query.url, data:result});
    });
  })
}

module.exports = {scriptApp};