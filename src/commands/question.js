import Command from '../../utils/Command.js';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { makeChain } from '../../utils/chain.js';
import { pinecone } from '../../utils/pinecone-client.js';

export default class extends Command {
  constructor() {
    super();
  }
  async run(client, ctx, args) {
    const question = args.join(' ');
    if (!question) return await ctx.reply('Necesitas preguntar algo.');

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      {
        pineconeIndex: index,
        textKey: 'text',
      }
    );

    const chain = makeChain(vectorStore);
    const res = await chain.call({
      question: question,
      chat_history: [],
    });

    await ctx.reply(res.text, { parse_mode: 'Markdown' });
  }
}
