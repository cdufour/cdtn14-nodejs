const decode = require('jsonwebtoken/decode');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data/chinook.db'
  }
})

const authenticate = async (req, res, next) => {

  // ToDo: vérifier le token avec .verify()
  const token = req.get('X-JWT');

  if (!token) return res.status(401).send();

  // Y a-t-il un utilisateur ayant ce token ?
  const result = await knex('users').where({token});

  if (result.length > 0) {
    // utilisateur trouvé
    next();
  } else {
    res.status(401).send();
  }
  
}

module.exports = { authenticate }