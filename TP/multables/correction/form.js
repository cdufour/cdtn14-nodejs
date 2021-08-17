const fs = require('fs');

const openingHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TP Multables</title>
</head>
<body>
  <h1>TP Multables</h1>
`;

const closingHtml = `
</body>
</html>
`;

const generateForm = (name, int) => {
  const filename = 
    `forms/${name.toLowerCase().replace(' ', '-')}-table-${int}.html`;
  let fullHtml = '';
  let body = `
  <h2>Etudiant: ${name}</h2>
  <h3>Table des ${int}</h3>
  `;

  for(let i=1; i<=10; i++) {
    body += `
    <div>
      <span>${i} x ${int}</span>
      <span> = </span>
      <input type="text">
    </div>
    `;
  }

  // assemblage de la page html
  fullHtml = openingHtml + body + closingHtml;
  fs.writeFileSync(filename, fullHtml);
  
}

module.exports = { generateForm };