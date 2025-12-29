// https://www.npmjs.com/package/rss-parser
// The demo shows reddit as an example...

const Parser = require('rss-parser');
const parser = new Parser();

async function getArticles() {
  let feed = await parser.parseURL('https://medium.com/@joshward_accounts/feed');
  return feed;
}

function blogScripts(req, res) {
  console.log('Blog request recieved');
  getArticles()
  .then((result) => {
    res.json(result);
  });
}

module.exports = {blogScripts};