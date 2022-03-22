// ———————————————[Packages]———————————————
const { MessageEmbed } = require('discord.js');
require('../../handlers/musicFunction');
const i18n = require('../../handlers/i18n');
const client = require('../../bot');

module.exports = {
    name: "Volume",
    aliases: ["volume", "v"],
    description: i18n.__("valume.description"),
    usage: i18n.__("valume.usage"),
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
            let volume_embed = new MessageEmbed()
                .setColor(client.colores.embedError)
                .setTitle(`${client.emotes.circleno}| Obecnie w kolejce nic nie ma!`)
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
            // Storing volume values in a variable
            const volume = parseInt(args[0]);

            // If a wrong value is entered, send information
            if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Proszę podać prawidłową wartość (0-100)!`);
            
            // Setting values 
            queue.setVolume(volume);
            
            // Sending an execution message
            message.channel.send(`${client.emotes.boxyes} | Głośność ustawiona na: \`${volume}\``);

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