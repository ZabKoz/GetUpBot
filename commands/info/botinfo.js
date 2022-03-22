// ———————————————[Packages]———————————————
const { MessageEmbed, MessageButton, version } = require('discord.js');
const paginate = require('@eugabrielsilva/djs-paginate');
const i18n = require('../../handlers/i18n');
const si = require('systeminformation');
const client = require('../../bot');
require('moment-duration-format');
const moment = require("moment");
const os = require('os');


module.exports = {
   name: "Botinfo",
   aliases: ["botinfo"],
   description: i18n.__("botinfo.description"),
   usage: "",
   cooldowns: 2000,
   premiumOnly: false,
   developersOnly: false,
   toggleOff: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   run: async (client, message, args) => {
     
    const duration1 = moment.duration(message.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    
    const cpu = await si.cpu();

    // Deleting user messages
    message.delete();
    
    // 
    let page1 = new MessageEmbed({
      color: client.colores.embedInfo,
      title: `**= ${i18n.__("botinfo.General")} =**`,
      description: `
      **• ${i18n.__("botinfo.username")}** : ${client.user.username}
      **• ${i18n.__("botinfo.tag")}** : ${client.user.tag}
      **• ${i18n.__("botinfo.id")}** : ${client.user.id}
      **• ${i18n.__("botinfo.owner")}** : ZabKoz#2744
      **• ${i18n.__("botinfo.createdAt")}** : ${moment(client.user.createdAt).format("DD-MM-YYYY HH:mm")}`,
      footer: {
        text: `${process.env.clientName} -> ${message.author.tag}`,
        icon_url: `${process.env.clientAvatar}`,
      },
    });

    //
    let page2 = new MessageEmbed({
        color: client.colores.embedInfo,
        title: `**= ${i18n.__("botinfo.Stats")} =**`,
        description: `
        **• ${i18n.__("botinfo.servers")}** : ${message.client.guilds.cache.size.toLocaleString()}
        **• ${i18n.__("botinfo.channels")}** : ${message.client.channels.cache.size.toLocaleString()}
        **• ${i18n.__("botinfo.users")}** : ${message.client.users.cache.size.toLocaleString()}
        **• ${i18n.__("botinfo.commands")}** :${client.commands.size}
        **• ${i18n.__("botinfo.Version")}** :
        > **• Discord.js** : v${version}
        > **• Node** : ${process.version}
        > **• Distube** : v${message.client.distube.version}`,
        footer: {
          text: `${process.env.clientName} -> ${message.author.tag}`,
          icon_url: `${process.env.clientAvatar}`,
        },
    });

    //
    let page3 = new MessageEmbed({
        color: client.colores.embedInfo,
        title: `**= ${i18n.__("botinfo.System")} =**`,
        description: `
        **• ${i18n.__("botinfo.Platfrom")}** : ${os.type}
        **• ${i18n.__("botinfo.Uptime")}** : ${duration1}
        **• ${i18n.__("botinfo.CPU")}** :
        > **• ${i18n.__("botinfo.Cores")}** : ${cpu.cores}
        > **• ${i18n.__("botinfo.Model")}** : ${os.cpus()[0].model} 
        > **• ${i18n.__("botinfo.Speed")}** : ${os.cpus()[0].speed} MHz
        **• ${i18n.__("botinfo.MEMORY")}** :
        > **• ${i18n.__("botinfo.TotalMemory")}** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
        > **• ${i18n.__("botinfo.FreeMemory")}** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
        > **• ${i18n.__("botinfo.HeapTotal")}** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
        > **• ${i18n.__("botinfo.HeapUsage")}** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
        `,
        footer: {
          text: `${process.env.clientName} -> ${message.author.tag}`,
          icon_url: `${process.env.clientAvatar}`,
        },
    });

    // Create an array with your pages
    let pages = [page1, page2, page3];

    paginate(message, pages, {
      timeout: 120, // Time (in seconds) to disable the paginator collector after no interactions are received.
      prevText: i18n.__("botinfo.prev"), // Text to show in the previous button.
      nextText: i18n.__("botinfo.next"), // Text to show in the next button.
      pageText: i18n.__("botinfo.pages"), // Text to show before the page counter.
      separatorText: 'from' // Text to show between the page counter.
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