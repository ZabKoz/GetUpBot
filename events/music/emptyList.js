// ———————————————[Packages]———————————————
const { MessageEmbed } = require("discord.js");
const client = require('../../bot');
const { embedRandom } = require('../../config/color.json');
const { boxyes } = require('../../config/emoji.json');

// ———————————————[Event code]———————————————
client.distube.on('empty', (channel, err, message) => {
    
    if (channel) {
        let Embed = new MessageEmbed()
        .setColor(embedRandom)
        .setTitle(`${boxyes}| Wyjście z kanału!`)
        .addField(`Powód: `, `Brak osób na kanale`)
        .setDescription(`${err.toString().slice(0, 1974)}`)
        .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` });
    channel.send({ embeds: [Embed] });
    } else console.error(err);
    
});

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */