// ———————————————[Packages]———————————————
const { MessageEmbed } = require("discord.js");
const client = require('../../bot');
const { embedError } = require('../../config/color.json');
const { boxno } = require('../../config/emoji.json');

// ———————————————[Event code]———————————————
client.distube.on('error', (channel, err, message) => {
    
    if (channel) {
        let Embed = new MessageEmbed()
        .setColor(embedError)
        .setTitle(`${boxno}| Błąd!`)
        .setDescription(`${err.toString().slice(0, 1974)}`)
        .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` });
    channel.send({ embeds: [Embed] });
    } else console.error(err)
    
});

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */