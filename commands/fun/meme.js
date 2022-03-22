// ———————————————[Packages]———————————————
const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');
const client = require('../../bot');
const i18n = require('../../handlers/i18n');

module.exports = {
   name: "meme",
   //aliases: ["..."],
   description: i18n.__("meme.description"),
   usage: "",
   cooldowns: 2000,
   premiumOnly: false,
   developersOnly: false,
   toggleOff: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   run: async (client, message, args) => {
      // Deleting user messages
      message.delete();
      try {
        var Responses = [
            "Polska_wpz",
            "MemyPolskaa",
            "polishfunny"
        ];
          
        const Response = Math.floor(Math.random() * Responses.length);
          
        const { body } = await request
            .get(`https://www.reddit.com/r/${Responses[Response]}.json?sort=top&t=week`)
            .query({
                limit: 800
            });
          
        const allowed = body.data.children;
        const randomnumber = Math.floor(Math.random() * allowed.length);
          
        let Meme_embed = new MessageEmbed()
            .setColor(client.colores.embedOk)
            .setTitle(`${client.emotes.meme}| Meme || ${Responses[Response]}`)
            .setDescription(
                `Tytuł: ${allowed[randomnumber].data.title}
                Wysłał: ${allowed[randomnumber].data.author}
                `
            )
            .setImage(allowed[randomnumber].data.url)
            .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` })
        message.channel.send({ embeds: [Meme_embed] }).then(embedMessage => {
            embedMessage.react(client.emotes.meme3)
            .then(() => embedMessage.react(client.emotes.meme1))
            .then(() => embedMessage.react(client.emotes.meme2))
        })
    } catch (err) {
        let Meme_embed = new MessageEmbed()
            .setColor(client.colores.embedError)
            .setTitle(`${client.emotes.circleno}| Wystąpił błąd!`)
        message.channel.send({ embeds: [Meme_embed] })
        console.log(err);
    };
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