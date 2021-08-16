const yargs = require('yargs');
const { addNote } = require('./notes');

const argv = yargs.command('add', 'Ajouter une note', {
  title: {
    describe: 'Titre de la note',
    alias: 't',
    required: true
  }
}).help().argv;

const cmd = argv._[0]; // récupère le nom de la commande
console.log(cmd);


//addNote();
