const fs = require('fs'); // module natif

const NOTES_FILE = 'notes-data.json';

const fetchNotes = () => {
  let notes = fs.readFileSync(NOTES_FILE);
  return JSON.parse(notes);
};

const addNote = (title) => {
  let notes = fetchNotes(); // récupération des notes enregistrées
  notes.push({title});
  saveNotes(notes);
};

const editNote = (title, newTitle) => {
  let notes = fetchNotes();

  for (let i=0; i<notes.length; i++) {
    if (notes[i].title === title) {
      notes[i].title = newTitle; // update
      saveNotes(notes); // update sur disque
      return true;
    }
  }

  return false;

};

const removeNote = (title) => {
  let notes = fetchNotes();
  let newNotes = notes.filter(note => note.title !== title);
  saveNotes(newNotes);
  return notes.length !== newNotes.length; // retourne booléen
};

const saveNotes = (notes) => {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes));
}

module.exports = {
  addNote,
  fetchNotes,
  editNote,
  removeNote
}
