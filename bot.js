// ———————————————[Packages]———————————————
require('dotenv').config();
const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const chalk = require('chalk');
const emoji = require('./config/emoji.json');
const color = require('./config/color.json');
const client = new Client({ intents: 32767 });

// ———————————————[Global Variables]———————————————
module.exports = client;
client.emotes = emoji;
client.colores = color;

// ———————————————[Collection & Handlers]———————————————
client.commands = new Collection(); // Commands collection
client.aliases = new Collection(); // Commands aliases collection
client.cooldowns = new Collection(); // Commands cooldowns collection
require('./handlers/commands')(client); // Handlers responsible for loading commands
require('./handlers/events')(client); // Handlers responsible for loading events
require('./handlers/dbConnection'); // Handlers responsible for loading database connection
require('./handlers/musicFunction'); // Handlers responsible for loading music functions

// ———————————————[Code]———————————————
// Retrieving client token from .env file
const token = process.env.clientToken;

// Checking if the variable "token" is empty
if (token === '') {
    // Display error information in the console
    console.log(
        chalk.gray('—————————————————') +
        chalk.white('[') + chalk.red('AntiCrash') + chalk.white(']') + 
        chalk.gray('—————————————————')
    );
    console.log(
        chalk.red('Przejdź do pliku .env i ustaw clientToken')
    );
} else {
    // Bot login
    client.login(token);
};

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */