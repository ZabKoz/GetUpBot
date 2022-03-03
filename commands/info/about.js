// ———————————————[Packages]———————————————
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const client = require('../../bot');

module.exports = {
   name: "about",
   aliases: ["about"],
   description: "Informacje o bocie",
   usage: " ",
   cooldowns: 2000,
   premiumOnly: false,
   developersOnly: false,
   toggleOff: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   run: async (client, message, args) => {
      // Deleting user messages
      message.delete();

      const ghButton = new MessageButton()
      .setStyle('LINK')
      .setURL('https://github.com/ZabKoz/GetUpBot')
      .setLabel('Source Code')
      .setEmoji(client.emotes.github);

      let about_embed = new MessageEmbed()
        .setColor(client.colores.embedOk)
        .setTitle('Ciekawostki o mnie?')
        .addFields(
            { name: `${client.emotes.dscUsers}| Użytkownicy:`, value: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}` },
            { name: `${client.emotes.dscServers}| Servery:`, value: `${client.guilds.cache.size}` },
            { name: `${client.emotes.dscCommands}| Komendy:`, value: `${client.commands.size}`, inline: false },
            { name: `${client.emotes.dscSettings}| Prefix:`, value: `${process.env.clientPrefix}`, inline: false },
        )
        .setTimestamp()
        .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` });

      const row = new MessageActionRow()
        .addComponents(ghButton)
      
      message.channel.send({ embeds: [about_embed], components: [row] }).then(msg => {
            setTimeout(() => msg.delete(), 120000)
      });
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