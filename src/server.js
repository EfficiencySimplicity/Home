const express = require('express');
const path = require('path');

const PORT = 3000; // process.env.PORT || 3000
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log('Home page request recieved');
  res.sendFile(path.resolve(__dirname, 'public/home/index.html'));
})

const appServer = app.listen(PORT, () => {
  console.log(`Site listening on port ${PORT}`);
})