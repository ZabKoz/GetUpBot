// ———————————————[Packages]———————————————
const { glob, sync } = require('glob');
const { promisify } = require('util');
const { Client } = require('discord.js');

// ———————————————[Variables]———————————————
const globPromise = promisify(glob);

// ———————————————[Handler code]———————————————
module.exports = async (client) => {

    // ———————————————[Commands]———————————————
    const commandsFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    
    commandsFiles.map((value) => {
        
        const file = require(value);
        const splitted = value.split('/');
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        };
    });

    // ———————————————[Slash Commands]———————————————
    const slashCommands = await globPromise(`${process.cwd()}/commandsSlash/*/*.js`)

    const arrayOfSlashCommands = [];

    slashCommands.map((value) => {
        const file = require(value);

        if (!file?.name) return;

        client.slashCommands.set(file.name, file)
        
        arrayOfSlashCommands.push(file);
        
        //console.log(arrayOfSlashCommands)

        if (file.name) {
            client.on('ready', async () => {
                await client.application.commands.set(arrayOfSlashCommands);
            });
        }
    });
};

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */