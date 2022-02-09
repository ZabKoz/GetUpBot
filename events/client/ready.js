// ———————————————[Packages]———————————————
const chalk = require('chalk');
const client = require('../../bot');

client.on('ready', async () => {
    // Set bot activity
    client.user.setActivity(
        `Servery: ${client.guilds.cache.size}`, // Text activity
        { type: 'LISTENING' } // Type activity ( COMPETING, LISTENING, PLAYING, STREAMING, WATCHING )
    );
    // Information bot
    console.log(
        chalk.gray('—————————————————') +
        chalk.white('[') + chalk.red('Informacje o bocie') + chalk.white(']') + 
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
        chalk.red.bold(
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
        chalk.yellowBright(`${client.commands.size}`),
        chalk.yellowBright(`Komend`)
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