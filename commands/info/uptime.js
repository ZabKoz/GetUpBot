// ———————————————[Packages]———————————————
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const client = require('../../bot');
const i18n = require('../../handlers/i18n');

module.exports = {
   name: "Uptime",
   aliases: ["up", "uptime"],
   description: i18n.__("uptime.description"),
   usage: " ",
   cooldowns: 2000,
   premiumOnly: false,
   developersOnly: false,
   toggleOff: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   run: async (client, message, args) => {
        
        // Deleting user messages 
        message.delete()

        let seconds = Math.floor(message.client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        // Creating the first Embed
        const Embed = new MessageEmbed()
            .setColor(client.colores.embedOk)
            .setTitle(client.emotes.boxyes + i18n.__mf("uptime.check"))
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
            .setTitle(client.emotes.boxyes + i18n.__mf("uptime.resultTitle"))
            .setDescription(i18n.__mf("uptime.result", { days: days, hours: hours, minutes: minutes, seconds: seconds }))
            .setTimestamp()
            .setFooter(
                {
                   text: `${process.env.clientName} -> ${message.author.tag}`,
                   iconURL: `${process.env.clientAvatar}`
                }
            );

        // Sending the first Embed
        message.channel.send({ embeds: [Embed] }).then((msg) => {
            setTimeout(function () {
                // Editing the first embed for the second
                msg.edit({ embeds: [Embed2] });
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