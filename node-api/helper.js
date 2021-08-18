const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data/chinook.db'
  }
})

const generateUserTable = async () => {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.createTable('users', table => {
    table.increments();
    table.string('email');
    table.string('password');
    table.string('token');
  })
}

generateUserTable();



//cette instruction ajoute à la table users à noter base de données
