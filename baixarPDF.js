const { MongoClient } = require('mongodb');
const fs = require('fs');

// Configurações do MongoDB
const uri = 'mongodb://localhost:27017';
const dbName = 'teste';
const collectionName = 'testePDF';

// Nome do arquivo PDF que você deseja baixar
const nomeArquivo = 'Kit_campinas_auxilio.pdf';

async function baixarPDF() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Consulta para obter o documento com o nome do arquivo específico
    const documento = await collection.findOne({ nome: nomeArquivo });

    if (documento) {
      // Extrair o arquivo PDF binário do documento
      const arquivoPDF = documento.arquivo.buffer;

      // Escrever o arquivo PDF no disco
      fs.writeFileSync('C:/Users/PREDATOR/Documents/SERVIDOR/downloadPDF/' + nomeArquivo, arquivoPDF);

      console.log('Arquivo PDF baixado com sucesso.');
    } else {
      console.log('Documento não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao baixar PDF:', error);
  } finally {
    await client.close();
  }
}

baixarPDF();
