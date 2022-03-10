// ———————————————[Handler code]———————————————
module.exports = {
    EmbedLevelingUp: async (message, member, conn, query2) => {
        EmbedLevelingUp(message, member, conn, query2);
        // Finish later
    },
    ErrorEmbed: async (client, message, err, ErrType) => {
        CreateErrorEmbed(client, message, err, ErrType);
    },
    NSFWEmbed: async (client, message, err, ErrType) => {
        if (err) {

            /**
             * 
             * @INFO
             * CENHE - Function responsible for error information in hentai commands
             * CENNE - Function responsible for error information in normal commands
             * CENE - The function responsible for informing that a channel is not suitable for this content
             * 
             */

            if (ErrType === "hentai") {
                CENHE(client, message, err);
                return;
            };

            if (ErrType === "normal") {
                CENNE(client, message, err);
                return;
            };
            
        } else {
            CENE(client, message);
            return;
        }
    },
};

function EmbedLevelingUp(message, member, conn, query2) {
    
    // ———————————————[Packages]———————————————
    const { MessageEmbed } = require('discord.js');
    const { embedError, embedInfo, embedUp, embedUp1 } = require('../config/color.json');
    const client = require('../bot');
       
    // Adding a user level
    conn.query("UPDATE guildLeveling SET userLevel = ? WHERE guildId = ? AND userId = ?", [query2.userLevel + 1, message.guild.id, member.id], () => {
        // Gather information about the channel "levelingChannel"
        conn.query("SELECT levelingChannel FROM guildSettings WHERE guildId = ?", [message.guild.id], async (err1, res1) => {
            // Collect information about "userXP" and "userPrestige" 
            conn.query("SELECT * FROM guildLeveling WHERE guildId = ? ORDER BY userXP AND userPrestige", [message.guild.id], async (err2, res2) => {
                // Collect information about the user who sent the message from a given server
                conn.query("SELECT * FROM guildLeveling WHERE guildId = ? AND userId = ?", [message.guild.id, member.id], async (err3, res3) => {
                    if (err1 || err2 || err3) {
                        // View filename and error: err1
                        if (err1) {
                            console.log(`Error #1 embedCreate`);
                            console.log(err1);
                        };
                        // View filename and error: err2
                        if (err2) {
                            console.log(`Error #2 embedCreate`);
                            console.log(err2);
                        };
                        // View filename and error: err3
                        if (err3) {
                            console.log(`Error #3 embedCreate`);
                            console.log(err3);
                        };
                        // Discontinue further operations
                        return;
                    };
                    async function createLevelUp() {
                        if (res1[0].levelingChannel === null) {
                            if (highestUser.userId == message.author.id) {
                                const levelNeeded = "Jesteś 1"
                                let lvlup_first = new MessageEmbed()
                                    .setColor(embedUp1)
                                    .setTitle(`Gratulacje awansowałeś na wyższy poziom!`)
                                    .setDescription(
                                        `
                                            Aktualnie jesteś najlepszy na ${message.guild.name}!\n
                                            Twój poziom to ${userLevel}
                                            Twoja ranga to ${user}
                                        `)
                                    .setThumbnail()
                                    .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
                                message.channel.send({ embeds: [lvlup_first] });
                            } else {
                                const levelNeeded = "";
                                let lvlup_embed = new MessageEmbed()
                                    .setColor(embedUp)
                                    .setTitle(`Gratulacje awansowałeś na wyższy poziom!`)
                                    .setDescription(`Twój poziom to ${userLevel} Twoja ranga to ${user}`)
                                    .setTimestamp()
                                    .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
                                message.channel.send({ embeds: [lvlup_embed] });
                            }
                        }
                    }
                    createLevelUp()
                });
            });
        });
    });
};
// Function for creating an embed with the error
function CreateErrorEmbed(client, message, err, ErrType) {
    // ———————————————[Packages]———————————————
    const { MessageEmbed } = require('discord.js');
    const chalk = require('chalk');

    if (ErrType === "WatchYT") { // Error in command watchyt
        let Embed = new MessageEmbed()
            .setTitle(`${client.emotes.circleno}| Wystąpił błąd!`)
            .setColor(client.colores.embedError)
            .setTimestamp()
            .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` })
        message.channel.send({ embeds: [Embed] })

        console.log(
            chalk.grey('[') + chalk.redBright('COMMAND WATCHYT ERROR') + chalk.grey('] ')
        );

        console.log(err);
    }

    let NoNsfw_embed = new MessageEmbed()
        .setColor(client.colores.embedError)
        .setTitle(`${client.emotes.circleno}| Wystąpił błąd!`)
        .setTimestamp()
        .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` })
    message.channel.send({ embeds: [NoNsfw_embed] })
    console.log(err);
};

// Function for creating an embed with the error "wrong channel"
function CENE(client, message) {
    // ———————————————[Packages]———————————————
    const { MessageEmbed } = require('discord.js');

    let noNsfw_embed = new MessageEmbed()
        .setColor(client.colores.embedError)
        .setTitle(`${client.emotes.circleno} | Ta komenda jest dozwolona tylko na kanałach \`NSFW\``)
        .setImage('https://media2.giphy.com/media/ToMjGpx9F5ktZw8qPUQ/giphy-downsized-large.gif')
        .setTimestamp()
        .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` })
            
    message.channel.send({ embeds: [noNsfw_embed] })
    .then(msg => {
        setTimeout(() => msg.delete(), 10000)
    });
}

// Function for creating an embed with an error
function CENHE(client, message, err) {
    // ———————————————[Packages]———————————————
    const { MessageEmbed } = require('discord.js');
    const chalk = require('chalk');

    let NoNsfw_embed = new MessageEmbed()
        .setColor(client.colores.embedError)
        .setTitle(`${client.emotes.boxno}| Upsss... Coś poszło nie tak!`)
        .setDescription(`Niestety ale bot napotkał pewien problem należy to zgłosić!`)
        .setImage('attachment://404_h.gif')
        .setTimestamp()
        .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` });

    message.channel.send({ embeds: [NoNsfw_embed], files: ['./assets/images/error/404_h.gif'] });

    console.log(
        chalk.grey('[') + chalk.redBright('COMMAND HENTAI +18 ERROR') + chalk.grey('] ')
    );

    console.log(err);
};

// Function for creating an embed with an error
function CENNE(client, message, err) {
    // ———————————————[Packages]———————————————
    const { MessageEmbed } = require('discord.js');
    const chalk = require('chalk');

    let NoNsfw_embed = new MessageEmbed()
        .setColor(client.colores.embedError)
        .setTitle(`${client.emotes.boxno}| Upsss... Coś poszło nie tak!`)
        .setDescription(`Niestety ale bot napotkał pewien problem należy to zgłosić!`)
        .setImage('attachment://404.png')
        .setTimestamp()
        .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` });

    message.channel.send({ embeds: [NoNsfw_embed], files: ['./assets/images/error/404.png'] });

    console.log(
        chalk.grey('[') + chalk.redBright('COMMAND NORMAL +18 ERROR') + chalk.grey('] ')
    );
    
    console.log(err);
};

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */