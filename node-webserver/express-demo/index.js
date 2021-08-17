const express = require('express');
const app = express();

// connecte l'app express au moteur de rendu pug
app.set('view engine', 'pug');

// Middleware
app.use(express.urlencoded({ extended: true }));

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

app.get('/teams', (req, res) => {
  const title = 'teams';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <h1>${title}</h1>
      </body>
    </html>
  `;
  res.send(html);
})

// Exemple d'utlisation de la Query String
app.get('/search', (req, res) => {
  const {team} = req.query;
  //res.set('Content-Type', 'application/json')
  //res.send(JSON.stringify({equipe: team}));
  // les deux lignes ci-dessus peuvent être résumées comme suit:
  res.json({equipe: team});
})

app.get('/product/:id', (req, res) => {
  res.send(req.params.id);
})

app.get('/juve/logo', (req, res) => {
  res.sendFile(__dirname + '/static/images/juve.jpg');
})

app.get('/login', (req, res) => {
  res.render('login', { message: 'Formulaire de login', active: true });
})

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  res.json({email, password});
})

app.listen(3300, () => {
  console.log('[+] Serveur HTTP écoutant le port 3300...')
})