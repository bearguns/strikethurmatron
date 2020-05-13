require('dotenv').config();
const Discord = require('discord.js');
const express = require('express');
const Pool = require('pg').Pool;
const app = express();
const port = 3030;
const DATABASE_URL = process.env.DATABASE_URL;
const TOKEN = process.env.TOKEN;

const { query } = require('./db');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: 'localhost',
  database: 'strikethurmatron_dev',
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

const chatBot = new Discord.Client();
chatBot.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).forEach(key => {
  chatBot.commands.set(botCommands[key].name, botCommands[key]);
});

chatBot.login(TOKEN);
chatBot.on('ready', () => console.log(`${chatBot.user.tag} is ready!`));

chatBot.on('message', msg => {
  if (msg.content.charAt(0) !== '!') return undefined;
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!chatBot.commands.has(command)) return;

  try {
    chatBot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});

app.get('/', (req, res) => res.send('Hello, world!'));
app.get('/query', async (req, res) => {
  const q = await query('SELECT * FROM quotes;');
  res.send(q);
});

app.listen(port, () => console.log('Listening on port ', port));
