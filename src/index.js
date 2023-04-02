import { Telegraf } from "telegraf";

const client = new Telegraf(process.env.TOKEN)

bot.start((ctx) => ctx.reply('Welcome'));

client.launch();