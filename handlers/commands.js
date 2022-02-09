// ———————————————[Packages]———————————————
const { glob, sync } = require('glob');
const { promisify } = require('util');
const { Client } = require('discord.js');
// ———————————————[Variables]———————————————
const globPromise = promisify(glob);

module.exports = async (client) => {
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
};
/**
 * 
 * @INFO
 * Website Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */