// ———————————————[Packages]———————————————
const { glob, sync } = require('glob');
const { promisify } = require('util');
const { Client } = require('discord.js');
// ———————————————[Variables]———————————————
const globPromise = promisify(glob);

module.exports = async (client) => {
    const eventsFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
    eventsFiles.map((value) => require(value))
    console.log(eventsFiles)
}
/**
 * 
 * @INFO
 * Website Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */