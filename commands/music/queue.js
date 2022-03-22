// ———————————————[Packages]———————————————
const { MessageEmbed } = require('discord.js');
require('../../handlers/musicFunction');
const i18n = require('../../handlers/i18n');
const client = require('../../bot');

module.exports = {
    name: "Queue",
    aliases: ["list", "queue"],
    description: i18n.__("queue.description"),
    usage: "",
    cooldowns: 2000,
    premiumOnly: false,
    inVoiceChannel: true,
    developersOnly: false,
    toggleOff: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, member) => {
        
        // Deleting user messages
        message.delete();
        
        // Fetching server queue data
        const queue = client.distube.getQueue(message)
        
        // Checking if there is a server queue
        if (!queue) {
            let no_queue = new MessageEmbed()
                .setColor(client.colores.embedError)
                .setTitle(`${client.emotes.circleno}| Obecnie w kolejce nic nie ma!`)
                .setTimestamp()
                .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` });
            
            message.channel.send({ embeds: [no_queue] }).then(msg => {
                // After waiting 60 seconds, the message is deleted
                setTimeout(() => msg.delete(), 60000)
            });

            // Interrupting further actions
            return;
        }
        try {

            const q = queue.songs
            .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .join('\n')
            
            message.channel.send(`${client.emotes.boxyes} | **Server Queue**\n${q}`)

        } catch (err) {
            
            // Displaying an error in the console
            console.log(err);
            
            // Sending an error embed
            let another_channel = new MessageEmbed()
                .setColor(client.colores.embedError)
                .setTitle(`${client.emotes.circleno}| Wystąpił błąd!`)
                .setTimestamp()
                .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` });
            
            message.channel.send({ embeds: [another_channel] }).then(msg => {
                // After waiting 60 seconds, the message is deleted
                setTimeout(() => msg.delete(), 60000)
            });
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