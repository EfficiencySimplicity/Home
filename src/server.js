const express = require('express');
const path = require('path');

const PORT = 3000; // process.env.PORT || 3000
const app = express();
app.use(express.static(path.join(__dirname, 'public/home page')));

app.get('/', (req, res) => {
  console.log('Home page request recieved');
  res.sendFile('index.html');
})

app.get('/about', (req, res) => {
  console.log('About page request recieved');
  res.sendFile('public/about page/index.html', { root: __dirname });
})

const appServer = app.listen(PORT, () => {
  console.log(`Site listening on port ${PORT}`);
})