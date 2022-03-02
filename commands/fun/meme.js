const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');
const { embedOk, embedError } = require('../../config/color.json');
const { circleno, meme, meme1, meme2, meme3 } = require('../../config/emoji.json');

module.exports = {
   name: "meme",
   //aliases: ["..."],
   description: "Memy",
   usage: " ",
   cooldowns: 2000,
   premiumOnly: false,
   developersOnly: false,
   toggleOff: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   run: async (client, message, args) => {
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
        let Nsfw_embed = new MessageEmbed()
            .setColor(embedOk)
            .setTitle(`| Meme || ${Responses[Response]}`)
            .setDescription(`Tytuł: ${allowed[randomnumber].data.title}\nWysłał: ${allowed[randomnumber].data.author}`)
            .setImage(allowed[randomnumber].data.url)
            .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` })
        message.channel.send({ embeds: [Nsfw_embed] }).then(embedMessage => {
            embedMessage.react(meme3)
            .then(() => embedMessage.react(meme1))
            .then(() => embedMessage.react(meme2))
        })
    } catch (err) {
        let NoNsfw_embed = new MessageEmbed()
            .setColor(embedError)
            .setTitle(`${circleno}| Wystąpił błąd!`)
        message.channel.send({ embeds: [NoNsfw_embed] })
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