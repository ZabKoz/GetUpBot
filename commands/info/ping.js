const { MessageEmbed } = require('discord.js')
module.exports = {
   name: "ping",
   aliases: ["p", "pong"],
   description: "Zwraca Ping",
   botpermissions: ["ADMINISTRATOR"],
   usage: "Jak szybki jest Bot?",
   cooldowns: 2000,
   developersOnly: false,
   toggleOff: false,
   run: async (client, message, args) => {
      const Embed = new MessageEmbed()
         .setColor('GREEN')
         .setTitle('Jak szybki jest Bot?')
         .setDescription(`\`${client.ws.ping}ms\` to moje opuźnienie`)
         .setTimestamp()
         //.setFooter(`${clientname}`, `${clientavatar}`);
      message.channel.send({ embeds: [Embed] });
   },
};