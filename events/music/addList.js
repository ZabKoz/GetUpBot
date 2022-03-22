// ———————————————[Packages]———————————————
const { MessageEmbed } = require("discord.js");
const i18n = require('../../handlers/i18n');
const client = require('../../bot');

// ———————————————[Event code]———————————————
client.distube.on("addList", async (queue, playlist) => {
    
    let Embed = new MessageEmbed()
        .setColor(client.colores.embedRandom)
        .setURL(playlist.url)
        .setTitle(i18n.__mf("addPlayList.Title") + `\`${playlist.name}\``)
        .setThumbnail(playlist.thumbnail)
        .setDescription(
            `
            **• ${i18n.__("addPlayList.Desc1")}** : ${playlist.songs.length}
            **• ${i18n.__("addPlayList.Desc2")}** : ${playlist.formattedDuration}
            **• ${i18n.__("addPlayList.Desc3")}** : ${playlist.user}
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