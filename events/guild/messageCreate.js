// ———————————————[Packages]———————————————
const { MessageEmbed } = require('discord.js');
const client = require('../../bot');
const ms = require('ms');
const { dbConnect } = require('../../handlers/dbConnection');
const { embedError, embedInfo, } = require('../../config/color.json');
const { circleno, info, } = require('../../config/emoji.json');
const messageFunction = require('../../handlers/messageFunction');

// ———————————————[Variables]———————————————
let conn;
conn = dbConnect();

client.on('messageCreate', async (message) => {
    // Checking that the message is not from a bot and that the channel type is not DM
    if (message.author.bot || message.channel.type === "DM") return;
    // Query the database for the prefix for a given server
    conn.query("SELECT * FROM guildPrefix WHERE guildId = ?", [message.guild.id], async (err1, res1) => {
        // If there is an error display it
        if (err1) {
            console.log(`Error #1 MessageCreate`);
            console.log(err1);
            return;
        }
        // If the query result is greater than 0
        if (res1.length > 0) {
            conn.query("SELECT * FROM guildSettings WHERE guildId = ?", [message.guild.id], async (err2, res2) => {
                conn.query("SELECT * FROM guildPremium WHERE guildId = ?", [message.guild.id], async (err3, res3) => {
                // Saves the value of the prefix variable as the prefix from the query
                const prefix = res1[0].guildPrefix;
                
                // If there is an error display it
                if (err2) {
                    console.log(`Error #2 MessageCreate`);
                    console.log(err2);
                    return;
                };

                if (res2.length > 0) {
                    messageFunction.handleMessages(message, conn, res2)
                };

                // If the message does not start with a prefix, skip the next steps
                if (!message.content.toLowerCase().startsWith(prefix)) return;
                if (!message.member)
                message.member = await message.guild.fetchMember(message)
                const[cmd, ...args] = message.content
                    .slice(prefix.length)
                    .trim()
                    .split(" ");
                // Send information if user only sent prefix
                let noargs_embed = new MessageEmbed()
                    .setTitle(`${info}| Nasze komendy znajdziesz pod \`${prefix}help\``)
                    .setColor(embedInfo)
                    .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
                    .setThumbnail()
                if (cmd.length === 0) {
                    message.channel.send({ embeds: [noargs_embed] })
                    .then(msg => {
                        setTimeout(() => msg.delete(), 10000);
                    });
                    return;
                };
                
                //Loading commands and aliases
                const command =
                    client.commands.get(cmd.toLowerCase()) ||
                    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
                
                // Send information if the user did not enter a command
                let nocmd_embed = new MessageEmbed()
                    .setTitle(`${circleno}| Nie znaleziono komendy!`)
                    .setDescription(`Spróbuj użyć \`${prefix}help\` aby znaleść odpowiednią komendę`)
                    .setColor(embedError)
                    .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
                    .setThumbnail()
                if (!command) return message.channel.send({ embeds: [nocmd_embed] })
                .then(msg => {
                    setTimeout(() => msg.delete(), 10000);
                });

                
                if (command.toggleOff) {
                    // Send information if the command has been deactivated
                    let toggleoff_embed = new MessageEmbed()
                        .setTitle(`${circleno}| Ups!`)
                        .setDescription(`Ta komenda została wyłączona przez developerów.`)
                        .setColor(embedError)
                        .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
                        .setThumbnail()

                    message.channel.send({ embeds: [toggleoff_embed] }).then(msg => {
                        setTimeout(() => msg.delete(), 10000);
                    });
                    return;
                }

                if (!message.guild.me.permissions.has(command.botpermissions || [])) {
                    // Send information that the bot does not have permissions to execute this
                    let botperms_embed = new MessageEmbed()
                        .setTitle(`${circleno}| Nie mam uprawnień do używania tego polecenia!`)
                        .setColor(embedError)
                        .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
                        .setThumbnail()

                    message.channel.send({ embeds: [botperms_embed] })
                    .then(msg => {
                        setTimeout(() => msg.delete(), 10000);
                    });
                    return;
                }

                if (command.developersOnly) {
                    // Checking if the user is among the developers
                    if (!process.env.developerID.includes(message.author.id)) {

                        // Send information that programmers can use this command
                        let developersOnly_embed = new MessageEmbed()
                            .setTitle(`${circleno}| Tylko programiści mogą używać tego polecenia!`)
                            .setColor(embedError)
                            .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
                            .setThumbnail()

                        message.channel.send({ embeds: [developersOnly_embed] })
                        .then(msg => {
                            setTimeout(() => msg.delete(), 10000);
                        });
                        return;
                    };
                }

                if (command.cooldowns) {
                    // Check if the user has cooldown
                    if (client.cooldowns.has(`${command.name}${message.author.id}`)) {

                        // Send information that you must wait before using this command
                        let cooldown_embed = new MessageEmbed()
                            .setTitle(
                                `${circleno}| Wolniej... Gdzie ci tak śpieszno?`)
                            .setDescription(
                                `Musisz odczekać \`${ms(
                                    client.cooldowns.get(`${command.name}${message.author.id}`) -
                                       Date.now(),
                                    { long: true }
                                 )}\` Aby użyć komendy \`${command.name}\` ponownie!`
                            )
                            .setColor(embedError)
                            .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
                            .setThumbnail()

                        message.channel.send({ embeds: [cooldown_embed] })
                        .then(msg => {
                            setTimeout(() => msg.delete(), 10000);
                        });
                        return;
                    };
                }
                
                if (command.inVoiceChannel) {
                    const VoiceChannel = message.member.voice.channel;
                    if (!VoiceChannel) {
                        //Send information that you must be on a voice channel to use this command
                        let no_channel = new MessageEmbed()
                            .setColor(embedError)
                            .setTitle(`${circleno}| Musisz być na kanale głosowym!`)
                            .setTimestamp()
                            .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` });
                        message.channel.send({ embeds: [no_channel] }).then(msg => {
                            setTimeout(() => msg.delete(), 10000)
                        });
                        return;
                    }
                }

                if (command.premiumOnly) {
                    // Checking if the server is premium
                    if (res3[0].premium === 'false') {
                        // If the server has the setting "premium = false" display the information
                        let premiumOnly_embed = new MessageEmbed()
                            .setTitle(`${circleno}| Tylko servery premium mogą używać tego polecenia!`)
                            .setColor(embedError)
                            .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
                        
                        if (command) return message.channel.send({ embeds: [premiumOnly_embed] })
                        .then(msg => {
                             setTimeout(() => msg.delete(), 10000);
                        });
                        return;
                    }
                };

                    client.cooldowns.set(
                        `${command.name}${message.author.id}`,
                        Date.now() + command.cooldowns
                    );

                    setTimeout(() => {
                        client.cooldowns.delete(`${command.name}${message.author.id}`);
                    }, command.cooldowns);
                    try {
                        await command.run(client, message, args);
                    } catch (e) {
                        console.error(e)
                        message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
                      }   
                });
            });
        };
    });
});
/** 
* @INFO
* Bot Coded by ZabKoz#2744
* @INFO
* Please mention me when you use this code!
*
*/