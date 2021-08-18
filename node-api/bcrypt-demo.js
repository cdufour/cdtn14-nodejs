const bcrypt = require('bcrypt');
const clearText = '1234';

// bcrypt.hash(clearText, 10, (err, hash) => {
//   console.log(hash);
// })


const hash1 = '$2b$10$4N5v440yqy/IvGdbA/TJ6e8.aSHB0qxKxpW2K6FGe5KMwgR56F28W';
const hash2 = '$2b$10$MXHwUVZDr3dd/4tDcQsPou3G2dqP2ben5fCoCUO4dqx1uD40phQmK';
const hash3 = '$2b$10$2D98pGPfWfeGbwNGmckYiemWTPL5lWN/NLbz.51NkRzM7yiQ7lpSO';


bcrypt.compare(clearText, hash3, (err, result) => {
  console.log(result)
})