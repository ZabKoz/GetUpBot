// ———————————————[Packages]———————————————
require('dotenv').config();
const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const chalk = require('chalk');

// ———————————————[Variables]———————————————
const client = new Client({ intents: 32767 });
module.exports = client;
// create new collection and load commands and events
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
require('./handlers/commands')(client);
require('./handlers/events')(client);
//
const token = process.env.clientToken;
//
if (token === '') {
    console.log(
        chalk.gray('—————————————————') +
        chalk.white('[') + chalk.red('AntiCrash') + chalk.white(']') + 
        chalk.gray('—————————————————')
    );
    console.log(
        chalk.red('Przejdź do pliku .env i ustaw clientToken')
    );
} else {
    client.login(token);
};

/**
 * 
 * @INFO
 * Website Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */