import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '../utils/pinecone-client.js';

export const run = async () => {
  try {
    const directoryLoader = new DirectoryLoader('docs', {
      '.pdf': (path) =>
        new PDFLoader(path, {
          pdfjs: () =>
            import('pdfjs-dist/legacy/build/pdf.js').then((m) => m.default),
        }),
    });

    console.log('[Ingest]: Loading docs directory...');

    const Splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await Splitter.splitDocuments(await directoryLoader.load());

    console.log('[Ingest]: Splitting docs...');

    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

    console.log('[Ingest]: Creating VectorStore...');

    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      textKey: 'text',
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('[Pinecone]: Error while ingesting your data.');
  }
};

(async () => {
  await run();
  console.log('[Ingest]: Ingestion complete.');
})();
