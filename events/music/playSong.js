const { MessageEmbed } = require("discord.js");
const client = require('../../bot');
const { embedRandom } = require('../../config/color.json');
const { YoutubemMusic, RB_Views, animatedBubble, Time } = require('../../config/emoji.json');

client.distube.on("playSong", (queue, song) => {
    let playSong_embed = new MessageEmbed()
        .setColor(embedRandom)
        .setTitle(`Dodano muzykę do kolejki`)
        .setThumbnail(song.thumbnail)
        .setDescription(`${YoutubemMusic}| [\`${song.name}\`](${song.url})`)
        .addField(`${RB_Views}| Wyświetlenia: `, `${song.views}`, true)
        .addField(`${Time}| Czas: `, `${song.formattedDuration}`, true)
        .addField(`${animatedBubble}| Proszone przez:`, `${song.user}`, false)
        .setTimestamp()
        .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
    queue.textChannel.send({ embeds: [playSong_embed] })
});

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */