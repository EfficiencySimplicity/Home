const express = require('express');
const path = require('path');

const { sitesILikeScripts } = require(path.resolve(__dirname, 'public/projects/sitesILike/serverScripts.js'));
const { blogScripts }       = require(path.resolve(__dirname, 'public/blog/serverScripts.js'));


const IP_ADDRESS = process.env.IP || '::';
const PORT = process.env.PORT || 8100;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log('Home page request recieved');
  res.sendFile(path.resolve(__dirname, 'public/home/index.html'));
})

app.get('/projects/sitesILike/reader', sitesILikeScripts);
app.get('/blog/reader', blogScripts);

// Handle errors
// https://expressjs.com/en/starter/faq.html
// https://expressjs.com/en/guide/error-handling.html

app.use((req, res, next) => {
  res.status(404).sendFile(path.resolve(__dirname, 'public/errors/404/index.html'))
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).sendFile(path.resolve(__dirname, 'public/errors/500/index.html'))
})


const appServer = app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Site listening on port ${PORT}`);
})