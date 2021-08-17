const yargs = require('yargs');
const { generateForm } = require('./form');

const argv = yargs
  .command('form', 'Génère un formulaire de table de multiplication', {
    name: {
      describe: 'Nom de l\'étudiant',
      alias: 'n'
    },
    int: {
      describe: 'Entier servant de base à la table à produire',
      alias: 'i',
      required: true
    }
  })
  .help()
  .argv;

const [cmd] = argv._;

if (cmd === 'form') {
  generateForm(argv.name, argv.int);
  console.log('[+] Formulaire généré')
} else {
  console.log('[-] Commande non reconnue')
}