import { PineconeClient } from '@pinecone-database/pinecone';

if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
  throw new Error(
    '[Enviroment]: Pinecone environment or api key variables missing'
  );
}

async function initializePinecone() {
  try {
    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT ?? '',
      apiKey: process.env.PINECONE_API_KEY ?? '',
    });

    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('[Pinecone]: Error initializing Pinecone client.');
  }
}

export const pinecone = await initializePinecone();
