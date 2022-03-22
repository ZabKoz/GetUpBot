// ———————————————[Packages]———————————————
const { MessageEmbed } = require("discord.js");
const i18n = require('../../handlers/i18n');
const client = require('../../bot');

// ———————————————[Event code]———————————————
client.distube.on("disconnect", async (client, queue) => {
    
    let Embed = new MessageEmbed()
        .setColor(client.colores.embedRandom)
        .setURL(playlist.url)
        .setTitle(clien.emotes.info + i18n.__mf("disconnect.Title"))
        .setThumbnail(playlist.thumbnail)
        .setDescription(
            `
            **• ${i18n.__("disconnect.Desc1")}** : ${playlist.songs.length}
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