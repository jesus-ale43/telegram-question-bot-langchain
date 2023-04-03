import { Telegraf } from 'telegraf';

const client = new Telegraf(process.env.TOKEN);

client.start((ctx) => ctx.reply('Welcome'));

client.launch();
