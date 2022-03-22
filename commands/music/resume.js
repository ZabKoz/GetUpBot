// ———————————————[Packages]———————————————
const { MessageEmbed } = require('discord.js');
require('../../handlers/musicFunction');
const i18n = require('../../handlers/i18n');
const client = require('../../bot');

module.exports = {
    name: "Resume",
    aliases: ["resume"],
    description: i18n.__("resume.description"),
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
            
            // Resume queue
            queue.resume()
            
            // Sending a queue resume message
            let resume_embed = new MessageEmbed()
                .setColor(client.colores.embedRandom)
                .setTitle(`${client.emotes.boxyes}| Wznowiono muzykę`)
                .addField(`${client.emotes.animatedBubble}| Proszone przez:`, `${message.author.tag}`, false)
                .setTimestamp()
                .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
            
            message.channel.send({ embeds: [resume_embed] });
            
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