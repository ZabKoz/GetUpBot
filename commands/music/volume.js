const { MessageEmbed } = require('discord.js');
require('../../handlers/musicFunction');
const { embedError } = require('../../config/color.json');
const { boxno, boxyes, circleno } = require('../../config/emoji.json');

module.exports = {
    name: "Volume",
    aliases: ["volume", "v"],
    description: "Bot dołącza do kanału",
    botpermissions: ["ADMINISTRATOR"],
    usage: "",
    cooldowns: 2000,
    premiumOnly: false,
    inVoiceChannel: true,
    developersOnly: false,
    toggleOff: false,
    run: async (client, message, args, member) => {
       // Deleting user messages
       message.delete();
       // Fetching server queue data
       const queue = client.distube.getQueue(message)
       // Checking if there is a server queue
       if (!queue) {
       let volume_embed = new MessageEmbed()
           .setColor(embedError)
           .setTitle(`${circleno}| Obecnie w kolejce nic nie ma!`)
           .setTimestamp()
           .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` });
       message.channel.send({ embeds: [volume_embed] }).then(msg => {
           // After waiting 60 seconds, the message is deleted
           setTimeout(() => msg.delete(), 60000)
       });
       // Interrupting further actions
       return;
       }
       try {
            const volume = parseInt(args[0])
            if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`)
            queue.setVolume(volume)
            message.channel.send(`${boxyes} | Volume set to \`${volume}\``)
       } catch (err) {
            // Displaying an error in the console
            console.log(err);
            // Sending an error embed
            let another_channel = new MessageEmbed()
                .setColor(embedError)
                .setTitle(`${circleno}| Wystąpił błąd!`)
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