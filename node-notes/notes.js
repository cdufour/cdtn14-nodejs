const fs = require('fs'); // module natif

const addNote = () => {
  console.log("Ajout d'une note");

  fs.writeFileSync('demo.txt', 'coucou');
}

module.exports = {
  addNote
}