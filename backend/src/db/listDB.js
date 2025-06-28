// listDB.js
// Execute: node listDB.js
// Instalação: npm install mongoose dotenv

require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/feira-ciencias';
  await mongoose.connect(uri);
  console.log('Conectado a', uri);

  // Busca todos os documentos na coleção 'projetos'
  const projetos = await mongoose.connection
    .db
    .collection('projetos')
    .find()
    .toArray();

  console.log('Projetos:', projetos);

  await mongoose.disconnect();
}

main().catch(err => {
  console.error('Erro:', err);
  process.exit(1);
});
