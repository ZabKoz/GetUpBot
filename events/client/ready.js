// ———————————————[Packages]———————————————
const chalk = require('chalk');
const client = require('../../bot');

client.on('ready', async () => {
    /**
     * 
     * @INFO
     * How to set bot activity?
     * Line 14 is responsible for the bot activity text
     * Line 15 is responsible for the type of bot activity
     * Types of bot activity ( COMPETING, LISTENING, PLAYING, STREAMING, WATCHING )
     * 
    */
    // Set bot activity
    client.user.setActivity(
        `Servery: ${client.guilds.cache.size}`,
        { type: 'LISTENING' }
    );
    // Information bot
    console.log(
        chalk.gray('—————————————————') +
        chalk.white('[') + chalk.red('Informacje Bot') + chalk.white(']') + 
        chalk.gray('—————————————————')
    );
    // Information on which user is logged in
    console.log(
        chalk.gray('Zalogowano jako:   '), chalk.red.underline.bold(client.user.tag)
    );
    // Information on how many users the bot watches over
    console.log(
        chalk.gray('Czuwam nad:        '),
        chalk.red.bold(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} `) +
        chalk.gray.bold(
            `${
                client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
                  ? "Użytkownikami"
                  : "Użytkownikiem"
            }`
        )
    );
    // Information on how many command bot has
    console.log(
        chalk.gray('Posiadam:          '),
        chalk.red.bold(`${client.commands.size}`),
        chalk.grey(`Komend`)
    );
});
/**
 * 
 * @INFO
 * Website Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */