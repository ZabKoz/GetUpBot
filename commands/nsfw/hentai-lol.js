// ———————————————[Packages]———————————————
const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');
const { embedError, embedNsfw } = require('../../config/color.json');
const { circleno, NSFW1, hentai, hentai1, hentai2, hentai3, NoGodNo} = require('../../config/emoji.json');

module.exports = {
    name: "hlol",
    //aliases: ["..."],
    description: "Hentai 18+",
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
                .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
            message.channel.send({ embeds: [noNsfw_embed] })
            .then(msg => {
                setTimeout(() => msg.delete(), 10000)
            });
        } else {
            try {
                var Responses = [
                    "Rule34LoL",
                    "LeagueOfLegendsNSFW",
                    "League_Of_Feet",
                    "KdaNSFW",
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
                    .setTitle(`${NSFW1}| Language of legends || ${Responses[Response]}`)
                    .setDescription(`Tytuł: ${allowed[randomnumber].data.title}\nWysłał: ${allowed[randomnumber].data.author}`)
                    .setImage(allowed[randomnumber].data.url)
                message.channel.send({ embeds: [Nsfw_embed] }).then(embedMessage => {
                    embedMessage.react(hentai)
                    .then(() => embedMessage.react(hentai1))
                    .then(() => embedMessage.react(hentai2))
                    .then(() => embedMessage.react(hentai3))
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