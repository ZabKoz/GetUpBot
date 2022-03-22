// ———————————————[Packages]———————————————
const chalk = require('chalk');
const client = require('../../bot');
const i18n = require('../../handlers/i18n');

// ———————————————[Event code]———————————————
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
    const activities = [
        `${process.env.clientPrefix}help`,
        `Servery: ${client.guilds.cache.size}`,
        `${client.commands.size} Komendy`,
        `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Użytkowników`,
        `${process.env.clientPrefix}help`
    ];

    setInterval(() => {
    // generate random number between 1 and list length.
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];

    client.user.setActivity(newActivity, {type: 'WATCHING'});
    }, 10000);
    
    // Information on which user is logged in
    console.log(
        chalk.grey('[') + chalk.greenBright('INFO') + chalk.grey('] ') +
        chalk.gray(i18n.__mf("Ready.login")) +
        chalk.red.underline.bold(client.user.tag)
    );
    
    // Information about the number of servers the bot is on
    console.log(
        chalk.grey('[') + chalk.greenBright('INFO') + chalk.grey('] ') +
        chalk.gray(i18n.__mf("Ready.servers")) +
        chalk.red.underline.bold(`${client.guilds.cache.size}`) +
        chalk.gray.bold(
            `${
                client.guilds.cache.size > 1
                  ? i18n.__mf("Ready.infoServers")
                  : i18n.__mf("Ready.infoServer")
            }`
        )
    );

    // Information on how many command bot has
    console.log(
        chalk.grey('[') + chalk.greenBright('INFO') + chalk.grey('] ') +
        chalk.gray(i18n.__mf("Ready.WatchingOver")) +
        chalk.red.underline.bold(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`) +
        chalk.gray.bold(
            `${
                client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
                  ? i18n.__mf("Ready.infoUsers")
                  : i18n.__mf("Ready.infoUser")
            }`
        )
    );
    
    // Information on how many command bot has
    console.log(
        chalk.grey('[') + chalk.greenBright('INFO') + chalk.grey('] ') +
        chalk.gray(i18n.__mf("Ready.IHave")) + chalk.red.underline.bold(`${client.commands.size}`) +
        chalk.grey(i18n.__mf("Ready.Commands"))
    );

    // Basic bot prefix information
    console.log(
        chalk.grey('[') + chalk.greenBright('INFO') + chalk.grey('] ') +
        chalk.gray(i18n.__mf("Ready.BasicPrefix")) + chalk.red.bold(`${process.env.clientPrefix}`)
    );
    
    console.log('');
    console.log('');

    // Contact information
    console.log(
        chalk.grey('[') + chalk.greenBright('INFO') + chalk.grey('] ') +
        chalk.gray(i18n.__mf("Ready.NeedHelp")) +
        chalk.grey('[') + chalk.greenBright('INFO') + chalk.grey('] ') +
        chalk.red.bold(`Discord: ZabKoz#2744\n`) +
        chalk.grey('[') + chalk.greenBright('INFO') + chalk.grey('] ') +
        chalk.red.bold(`Discord Server: `)
    );

});

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */