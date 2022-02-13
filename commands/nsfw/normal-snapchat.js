// ———————————————[Packages]———————————————
const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');
const { embedError, embedNsfw } = require('../../config/color.json');
const { circleno, NSFW1, boobs1, boobs2, slapAss2, assclap1, NoGodNo} = require('../../config/emoji.json');

module.exports = {
    name: "snapchat",
    //aliases: ["..."],
    description: "Normal 18+",
    botpermissions: ["ADMINISTRATOR"],
    usage: "",
    cooldowns: 2000,
    premiumOnly: true,
    developersOnly: false,
    toggleOff: false,

    run: async (client, message, args) => {
        message.delete();
        if (!message.channel.nsfw) {
            let noNsfw_embed = new MessageEmbed()
                .setColor(embedError)
                .setTitle(`${circleno} | Ta komenda jest dozwolona tylko na kanałach \`NSFW\``)
                .setImage('https://media2.giphy.com/media/ToMjGpx9F5ktZw8qPUQ/giphy-downsized-large.gif')
                .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` })
            message.channel.send({ embeds: [noNsfw_embed] })
            .then(msg => {
                setTimeout(() => msg.delete(), 10000)
            });
        } else {
            try {
                var Responses = [
                    "slutsofsnapchat",
                    "OnlyFans101",
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
                    .setColor(embedNsfw)
                    .setTitle(`${NSFW1}| Snapchat || ${Responses[Response]}`)
                    .setDescription(`Tytuł: ${allowed[randomnumber].data.title}\nWysłał: ${allowed[randomnumber].data.author}`)
                    .setImage(allowed[randomnumber].data.url)
                    .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` })
                message.channel.send({ embeds: [Nsfw_embed] }).then(embedMessage => {
                    embedMessage.react(boobs1)
                    .then(() => embedMessage.react(boobs2))
                    .then(() => embedMessage.react(assclap1))
                    .then(() => embedMessage.react(slapAss2))
                    .then(() => embedMessage.react(NoGodNo))
                })
            } catch (err) {
                let NoNsfw_embed = new MessageEmbed()
                    .setColor(embedError)
                    .setTitle(`${circleno}| Wystąpił błąd!`)
                message.channel.send({ embeds: [NoNsfw_embed] })
                console.log(err);
            };
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