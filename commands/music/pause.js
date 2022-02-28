// ———————————————[Packages]———————————————
const { MessageEmbed } = require('discord.js');
require('../../handlers/musicFunction');
const { embedError, embedOk } = require('../../config/color.json');
const { boxno, boxyes, circleno, animatedBubble, YoutubemMusic } = require('../../config/emoji.json');

module.exports = {
    name: "Pause",
    aliases: ["stop", "pause"],
    description: "Zatrzymanie muzyki",
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
        let no_queue = new MessageEmbed()
            .setColor(embedError)
            .setTitle(`${circleno}| Obecnie w kolejce nic nie ma!`)
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
            // Pause queue
            queue.pause()
            // Sending a queue pause message
            let skip_embed = new MessageEmbed()
                .setColor(embedOk)
                .setTitle(`${boxyes}| Zatrzymano muzykę`)
                .addField(`${animatedBubble}| Proszone przez:`, `${message.author.tag}`, false)
                .setTimestamp()
                .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
            message.channel.send({ embeds: [skip_embed] });
            
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