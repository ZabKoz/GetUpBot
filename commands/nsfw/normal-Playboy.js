// ———————————————[Packages]———————————————
const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const { embedError, embedNsfw } = require('../../config/color.json');
const { circleno, NSFW1, boobs1, boobs2, slapAss2, assclap1, NoGodNo} = require('../../config/emoji.json');

module.exports = {
    name: "Playboy",
    aliases: ["playboy"],
    description: "Normal 18+",
    usage: "",
    cooldowns: 2000,
    premiumOnly: true,
    developersOnly: false,
    toggleOff: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
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
                async function getImage() {
                    // Subreddits
                    var Responses = [
                        "Playboy_Albums",
                    ];
                    // Get random subreddits
                    const Response = Math.floor(Math.random() * Responses.length);
                    // Website search
                    const { body } = await request
                        .get(`https://www.reddit.com/r/${Responses[Response]}.json?sort=top&t=week`)
                        .query({
                            limit: 800
                        });
                    // Collecting nsfw
                    const allowed = body.data.children;
                    // Get random post
                    const randomnumber = Math.floor(Math.random() * allowed.length);
                    // Post information
                    let title = allowed[randomnumber].data.title;
                    let author = allowed[randomnumber].data.author;
                    let score = allowed[randomnumber].data.ups;
                    let comments = allowed[randomnumber].data.num_comments;
                    let link = allowed[randomnumber].data.url;
                    // If the link contains the words redgifs and gifv
                    if (link.includes('redgifs')
                        || link.includes('gifv')
                        || link.includes('gfycat')
                        || link.includes('mp4')
                        || link.includes('comments')
                        || link.includes('gallery')) {
                        let Nsfw_embed = {
                            title: `${NSFW1}| PlayBoy || ${Responses[Response]}`,
                            fields: [
                                {
                                    name: 'Tytuł:',
                                    value: title,
                                },
                                {
                                    name: 'Autor:',
                                    value: author,
                                    inline: false,
                                },
                                {
                                    name: 'Głosy:',
                                    value: `👍| ${score}`,
                                    inline: true,
                                },
                                {
                                    name: 'Komentarze:',
                                    value: `💬| ${comments}`,
                                    inline: true,
                                },
                            ],
                            footer: {
                                text: `${process.env.clientName} -> ${message.author.tag}`,
                                icon_url: `${process.env.clientAvatar}`,
                            },
                            color: embedNsfw,
                        }
                        message.channel.send({ embeds: [Nsfw_embed] })
                        message.channel.send(link).then(embedMessage => {
                            embedMessage.react(boobs1)
                            .then(() => embedMessage.react(boobs2))
                            .then(() => embedMessage.react(assclap1))
                            .then(() => embedMessage.react(slapAss2))
                            .then(() => embedMessage.react(NoGodNo))
                        })
                        return;
                    }
                    // Create embed
                    let Nsfw_embed = new MessageEmbed()
                        .setColor(embedNsfw)
                        .setURL(link)
                        .setTitle(`${NSFW1}| Playboy || ${Responses[Response]}`)
                        .addField("Tytuł:", title)
                        .addField("Autor:", author, false)
                        .addField("Głosy:", `👍| ${score}`, true)
                        .addField("Komentarze:", `💬| ${comments}`, true)
                        .setImage(allowed[randomnumber].data.url)
                        .setTimestamp()
                        .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` })
                        message.channel.send({ embeds: [Nsfw_embed] }).then(embedMessage => {
                        embedMessage.react(boobs1)
                        .then(() => embedMessage.react(boobs2))
                        .then(() => embedMessage.react(assclap1))
                        .then(() => embedMessage.react(slapAss2))
                        .then(() => embedMessage.react(NoGodNo))
                    })
                }
                getImage();
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