const express = require('express');
const app = express();
const port = 3500;
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data/chinook.db'
  }
})
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {authenticate} = require('./middleware/authenticate');

// Parsing du json dans le corps des requêtes
app.use(express.json());

//app.get('/team/add') WRONG !
//app.post('/team/add') WRONG !
//app.post('/team') // CORRECT !

// Entité: Artist
app.get('/artist', authenticate, (req, res) => {

  knex.select('Name').from('artists').then((artists) => {
    res.json(artists);
  })
})

app.get('/artist/:id', authenticate, async (req, res) => {
  
  // knex
  //   .select('*')
  //   .from('artists')
  //   .where('ArtistId', req.params.id)
  //   .then(artist => res.json(artist))

  // Syntaxe alternative
  try {
    const artist = await knex.select('*')
      .from('artists')
      .where('ArtistId', req.params.id);

    res.json(artist);
  } catch(e) {
    res.json({e})
  }


  

})

app.post('/artist', async (req, res) => {

  const { Name } = req.body;
  const newArtist = await knex.insert({Name}).into('artists');
  res.json({newArtist});
})

app.patch('/artist/:id', async (req, res) => {

  const { id } = req.params;
  const { newName } = req.body;

  const result = await knex('artists')
    .where({ArtistId: id})
    .update({Name: newName})

  // en cas de requête SQL réussite result vaut 1
  res.json({result});
})

app.delete('/artist/:id', async (req,res) => {

  const {id} = req.params;

  const result = await knex('artists')
    .where({ArtistId : id})
    .del();

  res.json({result});

})


// Entité User
app.post('/user', async (req, res) => {

  const {email,password} = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
    const result = await knex('users').insert({email, password: hash});
    res.json({result});
  })

})

app.post('/login', async (req, res) => {

  const {email,password} = req.body;

  const result = await knex('users')
    .where({email}).select('id', 'password');

  if (result.length > 0) {

    const userId = result[0].id;

    bcrypt.compare(password, result[0].password, (err, compareResult) => {

      if (compareResult) {
        // mot de passe identique
        // génération d'un JWT
        jwt.sign({userId}, 'secret', null, async (err, token) => {
          
          // enregistrement du token en base
          await knex('users').where({id: userId}).update({token});

          // réponse au client
          res.set('X-JWT', token)
          res.json({login: true});
        
        })

      } else {
        res.json({login: false});
      }

    })
  } else {
    res.json({login: false});
  }

})


app.listen(port, () => console.log('Serveur sur port ' + port))