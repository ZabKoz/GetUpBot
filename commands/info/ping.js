const { MessageEmbed } = require('discord.js')
const { embedOk } = require('../../config/color.json')

module.exports = {
   name: "ping",
   //aliases: ["..."],
   description: "Zwraca Ping",
   botpermissions: ["ADMINISTRATOR"],
   usage: " ",
   cooldowns: 2000,
   premiumOnly: true,
   developersOnly: false,
   toggleOff: false,
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