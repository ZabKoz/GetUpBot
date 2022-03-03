// ———————————————[Packages]———————————————
const chalk = require('chalk');
const client = require('../../bot');
const create = require('../../handlers/addDbGuild');

// ———————————————[Event code]———————————————
client.on("guildCreate", async (guild) => {
    try {
        const guildId = guild.id
        
        // Call the add and check functions
        await create.addDbGuild(guildId);
        
        // Display in the terminal information
        console.log(
            chalk.gray('—————————————————') +
            chalk.white('[') + chalk.red('Dodawanie servera') + chalk.white(']') + 
            chalk.gray('—————————————————')
        );
        
        // Display in the terminal information about the addition of
        console.log(chalk.gray('Dodano nowy server: ') + chalk.red.underline.bold(`${guild.name} || ${guild.id}`));

    } catch (err) {
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