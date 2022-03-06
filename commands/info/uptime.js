// ———————————————[Packages]———————————————
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const client = require('../../bot');

module.exports = {
   name: "uptime",
   aliases: ["up"],
   description: "Czas działania",
   usage: " ",
   cooldowns: 2000,
   premiumOnly: false,
   developersOnly: false,
   toggleOff: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   run: async (client, message, args) => {

      message.delete();

        let uptime_embed = new MessageEmbed()
            .setColor(client.colores.embedOk)
            .setTitle('Sprawdzanie...')
            .setDescription(`${client.emotes.uptime}| \`${ms(client.uptime)}\``)
            .setTimestamp()
            .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` });
        
        message.channel.send({ embeds: [uptime_embed] }).then(msg => {
            setTimeout(() => msg.delete(), 60000)
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