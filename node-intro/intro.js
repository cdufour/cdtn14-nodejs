const { getMaxValue, PI } = require('./utils');

function average(notes) {
  let total = 0;
  notes.forEach(note => total += note);
  return total / notes.length;
}

console.log("Formation Nodejs");

const notes = [4,12,20,3,0,11];
let total = 0;
notes.forEach(note => total += note);

console.log(`Total des notes: ${total}`);
console.log(`Moyenne des notes: ${average(notes)}`);
console.log(`Valeur maximale: ${getMaxValue(notes)}`);