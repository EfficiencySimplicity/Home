const express = require('express');
const path = require('path');

const { scriptApp } = require(path.join(__dirname, 'public/projects/sitesilike/serverScripts.js'));

const PORT = 8100; // process.env.PORT || 3000
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log('Home page request recieved');
  res.sendFile(path.resolve(__dirname, 'public/home/index.html'));
})

scriptApp(app);

const appServer = app.listen(PORT, () => {
  console.log(`Site listening on port ${PORT}`);
})