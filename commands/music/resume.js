// ———————————————[Packages]———————————————
const { MessageEmbed } = require('discord.js');
require('../../handlers/musicFunction');
const { embedError, embedRandom } = require('../../config/color.json');
const { boxno, boxyes, circleno, animatedBubble } = require('../../config/emoji.json');

module.exports = {
    name: "Resume",
    aliases: ["resume"],
    description: "Wznowienie muzyki",
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
            // Resume queue
            queue.resume()
            // Sending a queue resume message
            let resume_embed = new MessageEmbed()
                .setColor(embedRandom)
                .setTitle(`${boxyes}| Wznowiono muzykę`)
                .addField(`${animatedBubble}| Proszone przez:`, `${message.author.tag}`, false)
                .setTimestamp()
                .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
            message.channel.send({ embeds: [resume_embed] });
            
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