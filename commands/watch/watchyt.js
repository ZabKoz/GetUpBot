// ———————————————[Packages]———————————————
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const embedCreate = require('../../handlers/embedCreate');
const i18n = require('../../handlers/i18n');
const client = require('../../bot');

module.exports = {
    name: "Watchyt",
    aliases: ["watchyt"],
    description: i18n.__mf("watchyt.description"),
    usage: "",
    cooldowns: 2000,
    premiumOnly: false,
    inVoiceChannel: true,
    developersOnly: false,
    toggleOff: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, member) => {

       try {
            // Creating a watch client together
            client.DiscordTogether = new DiscordTogether(client);
            
            // A variable indicating whether the user is on the channel
            let voiceChannel = message.member.voice.channel.id;
            
            // Deleting user messages
            message.delete();
            
            // Creating a link and together
            client.DiscordTogether.createTogetherCode(voiceChannel, 'youtube').then(async invite => {
                
                let Embed = new MessageEmbed()
                    .setURL(invite.code)
                    .setTitle(`${client.emotes.circleno}| Kliknij tutaj aby dołączyć!`)
                    .setColor(client.colores.embedInfo)
                    .setImage('attachment://youtube.gif')
                    .setTimestamp()
                    .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` })
                message.channel.send({ embeds: [Embed], files: ['./assets/images/youtube.gif'] })
            });
            
       } catch (err) {   
            let ErrType = 'WatchYT';    
            embedCreate.ErrorEmbed(client, message, err, ErrType);
       }
    },
};

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */