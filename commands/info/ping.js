// ———————————————[Packages]———————————————
const { MessageEmbed } = require('discord.js');
const client = require('../../bot');
const i18n = require('../../handlers/i18n');

module.exports = {
   name: "Ping",
   aliases: ["ping"],
   description: i18n.__("ping.description"),
   usage: "",
   cooldowns: 2000,
   premiumOnly: false,
   developersOnly: false,
   toggleOff: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   run: async (client, message, args) => {
        
      // Deleting user messages 
      message.delete()

      // Creating the first Embed
      const Embed = new MessageEmbed()
         .setColor(client.colores.embedRandom)
         .setTitle(client.emotes.boxyes + i18n.__mf("ping.check"))
         .setThumbnail('attachment://ping.jpg')
         .setTimestamp()
         .setFooter(
            {
               text: `${process.env.clientName} -> ${message.author.tag}`,
               iconURL: `${process.env.clientAvatar}`
            }
         );

      // Creating a second Embed
      const Embed2 = new MessageEmbed()
         .setColor(client.colores.embedInfo)
         .setTitle(client.emotes.boxyes + i18n.__mf("ping.resultTitle"))
         .setDescription(i18n.__mf("ping.result", { ping: Math.round(message.client.ws.ping) }))
         .setThumbnail('attachment://pong.jpg')
         .setTimestamp()
         .setFooter(
            {
               text: `${process.env.clientName} -> ${message.author.tag}`,
               iconURL: `${process.env.clientAvatar}`
            }
         );

      // Sending the first Embed
      message.channel.send({ embeds: [Embed], files: ['./assets/images/ping/ping.jpg'] }).then((msg) => {
         setTimeout(function () {
            // Editing the first embed for the second
            msg.edit({ embeds: [Embed2], files: ['./assets/images/ping/pong.jpg'] });
         }, 5000) // Time in milliseconds [5s]
      })
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