const yargs = require('yargs');
const { addNote, fetchNotes, editNote, removeNote } = require('./notes');

const titleOption = {
  describe: 'Titre de la note',
  alias: 't',
  required: true
};

const argv = yargs
  .command('add', 'Ajouter une note', { title: titleOption})
  .command('list', 'Afficher la liste des commandes')
  .command('edit', 'Modifier une note', { 
    title: titleOption,
    newTitle: {
      describe: 'Nouveau titre de la note',
      required: true
    }
  })
  .command('remove', 'Supprimer une note', { title: titleOption })
  .help()
  .argv;

const cmd = argv._[0]; // récupère le nom de la commande

if (cmd === 'add') {
  addNote(argv.title);
  console.log('[+] Note enregistrée');
} else if (cmd === 'list') {
  let notes = fetchNotes();
  console.log('[+] Liste des notes enregistrées');
  notes.forEach(note => console.log(note.title))
} else if (cmd === 'edit') {
  let result = editNote(argv.title, argv.newTitle);
  if (result) {
    console.log('[+] Note mise à jour')
  } else {
    console.log('[-] Aucune note portant ce titre n\'a a été trouvée');
  }
} else if (cmd === 'remove') {
  let result = removeNote(argv.title);
  if (result) {
    console.log('[+] La note a été supprimée');
  } else {
    console.log('[-] La note n\'a pas été supprimée');
  }
} else {
  console.log('[-] Commande non reconnue');
}

