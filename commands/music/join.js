const { MessageEmbed } = require('discord.js');
require('../../handlers/musicFunction');
const { embedError } = require('../../config/color.json');
const { boxno, boxyes, circleno } = require('../../config/emoji.json');

module.exports = {
    name: "Join",
    aliases: ["join"],
    description: "Bot dołącza do kanału",
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
            // Deleting user messages
            message.delete();
            // A variable indicating whether the user is on the channel
            let voiceChannel = message.member.voice.channel;
            // Deleting user messages
            message.delete();
            // Joining a channel by a bot
            client.distube.voices.join(voiceChannel);
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