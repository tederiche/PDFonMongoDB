const { MongoClient } = require('mongodb');
const fs = require('fs');

// Configurações do MongoDB
const uri = 'mongodb://localhost:27017';
const dbName = 'teste';
const collectionName = 'testePDF';

// Caminho para o arquivo PDF
const caminhoArquivoPDF = 'C:/Users/PREDATOR/Downloads/Kit_campinas_auxilio.pdf';

async function adicionarPDF() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Ler o arquivo PDF como binário
    const arquivoPDF = fs.readFileSync(caminhoArquivoPDF);

    // Criar um documento com o arquivo PDF binário
    const documento = { nome: 'Kit_campinas_auxilio.pdf', arquivo: arquivoPDF };

    // Inserir o documento na coleção
    const result = await collection.insertOne(documento);
    console.log('Arquivo PDF inserido com sucesso:', result.insertedId);
  } catch (error) {
    console.error('Erro ao adicionar PDF:', error);
  } finally {
    await client.close();
  }
}

adicionarPDF();
