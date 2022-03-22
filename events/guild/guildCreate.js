// ———————————————[Packages]———————————————
const chalk = require('chalk');
const client = require('../../bot');
const create = require('../../handlers/addDbGuild');
const i18n = require('../../handlers/i18n');

// ———————————————[Event code]———————————————
client.on("guildCreate", async (guild) => {
    try {
        const guildId = guild.id
        
        // Call the add and check functions
        await create.addDbGuild(guildId);
        
        // Display in the terminal information about the addition of
        console.log(
            chalk.grey('[') + chalk.greenBright('NEWS') + chalk.grey('] ') +
            chalk.gray(i18n.__mf("GuildCreate.NewServer")) + chalk.red.underline.bold(`${guild.name} || ${guild.id}`)
        );

    } catch (err) {

        console.log(
            chalk.grey('[') + chalk.redBright('ERROR') + chalk.grey('] ') +
            chalk.gray(`Error #1 GuildCreate `)
        );
        
        console.log(err);
    };
    
});

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */