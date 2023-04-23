# Telegram question bot for large PDF documents.

This Telegram bot allows you to ask natural language questions about PDFs you want to consult, using Langchain and the OpenAI API to process and answer the questions.

## Requirements
- Node.js 18 or higher
- A Telegram account
- A OpenAI account
- A Pinecone account

## Installation

1. Clone this repository on your local machine.
```bash
$ git clone https://github.com/jesus-ale43/telegram-question-bot-langchain.git
```

2. Install the required dependencies.
> Note: You can use your own package manager if you prefer, just make sure to install the dependencies in the `package.json` file.
```bash
$ yarn install
```

3. Create an index in Pinecone.
> Dimension: **1536**<br/>
Pod Type: **P1 - Faster queries** (Recommended)
<details>
  <summary>Preview Image</summary>
<img src="https://user-images.githubusercontent.com/54212600/233852743-99cee074-7962-4233-bddd-4f415da94d83.png"/>
</details>

4. Set up your `.env` file.

Copy `.env.example` into `.env`

Your `.env` file should look like this:
```
TOKEN=
OPENAI_API_KEY=

PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
PINECONE_INDEX_NAME=
```
- [Telegram](https://core.telegram.org/bots#how-do-i-create-a-bot)
- [OpenAI](https://platform.openai.com/docs/introduction/overview)
- [Pinecone](https://pinecone.io/)

## Usage
### Convert your PDF files to embeddings

**This repository can load multiple PDF files**

1. Inside `docs` folder, add your pdf files.

2. Run the script `yarn ingest` to `ingest` and embed your docs.

3. Check [Pinecone dashboard](https://app.pinecone.io/) to verify your vectors have been added.

### Run the app

Once you've verified that the embeddings and content have been successfully added to your Pinecone, you can run the script `yarn dev` to launch the local dev environment, and then type `/question <question>` in your Telegram bot chat.

## Credits
- [gpt4-pdf-chatbot-langchain](https://github.com/mayooear/gpt4-pdf-chatbot-langchain/)
- [telegraf](https://github.com/telegraf/telegraf)
- [langchain-js-tutorial](https://github.com/mayooear/langchain-js-tutorial)
- [chat-langchain](https://github.com/hwchase17/chat-langchain)
