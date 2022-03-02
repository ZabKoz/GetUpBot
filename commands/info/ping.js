const { MessageEmbed } = require('discord.js');
const { embedOk } = require('../../config/color.json');

module.exports = {
   name: "ping",
   //aliases: ["..."],
   description: "Zwraca Ping",
   usage: " ",
   cooldowns: 2000,
   premiumOnly: false,
   developersOnly: false,
   toggleOff: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   run: async (client, message, args) => {
      message.delete()
      let ping_embed = new MessageEmbed()
         .setColor(embedOk)
         .setTitle('Pingowanie...')
         .setDescription(`🏓\`${client.ws.ping}ms\``)
         .setTimestamp()
         .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` });
      message.channel.send({ embeds: [ping_embed] });
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