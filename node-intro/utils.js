const getMaxValue = (notes) => {
  let max = notes[0]; // premier élément

  for (let i=0; i<notes.length; i++)
    if (notes[i] > max) max = notes[i];

  return max;
}

const PI = 42.14;

module.exports = { getMaxValue, PI }