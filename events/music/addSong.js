// ———————————————[Packages]———————————————
const { MessageEmbed } = require("discord.js");
const i18n = require('../../handlers/i18n');
const client = require('../../bot');

// ———————————————[Event code]———————————————
client.distube.on("addSong", (queue, song) => {
    
    let duration = song.duration * 1000;

    let Embed = new MessageEmbed()
        .setColor(client.colores.embedRandom)
        .setURL(song.url)
        .setTitle(i18n.__mf("addSong.Title") + `\`${song.name}\``)
        .setThumbnail(song.thumbnail)
        .setDescription(
            `
            **• ${i18n.__("addSong.Desc1")}** : ${song.formattedDuration}
            **• ${i18n.__("addSong.Desc2")}** : ${song.user}
            `
        )
        .setTimestamp()
        .setFooter(
            { 
                text: `${process.env.clientName}`,
                iconURL: `${process.env.clientAvatar}` 
            }
        );

    queue.textChannel.send({ embeds: [Embed] });
    
});

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */