import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'node:fs';
import * as path from 'node:path';

import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const client = new Telegraf(process.env.TOKEN);
client.commands = new Map();

client.on(message('text'), async (ctx) => {
  if (!ctx.message.text.startsWith('/')) return;

  const args = ctx.message.text.trim().slice(1).split(/ +/g);
  const command = client.commands.get(args.shift().toLowerCase());

  if (!command) return;

  try {
    await command.run(client, ctx, args);
  } catch (error) {
    console.log(error);
  }
});

const commandFiles = fs
  .readdirSync(path.join(process.cwd(), 'src/commands'))
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const name = path.basename(file, path.extname(file));
  const Module = await import(`./commands/${file}`);
  const Class = new Module.default({});
  client.commands.set(name, Class);
}

client.launch();
