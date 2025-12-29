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

const appServer = app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Site listening on port ${PORT}`);
})