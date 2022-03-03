// ———————————————[Packages]———————————————
const { MessageEmbed } = require('discord.js');
require('../../handlers/musicFunction');
const client = require('../../bot');

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