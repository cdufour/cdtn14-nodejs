const express = require('express');
const app = express();

app.get('/', (req, res) => {
  //res.set('Content-Type', 'text/plain');
  res.set({
    'Content-Type':'text/plain',
    'X-Token': 'monsupertoken'
  });
  res.send('ok');
})

app.get('/notfound', (req, res) => {
  res.status(404).send('Je n\'existe pas :-(((');
})

app.listen(3300, () => {
  console.log('[+] Serveur HTTP écoutant le port 3300...')
})