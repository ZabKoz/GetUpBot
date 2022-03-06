// ———————————————[Packages]———————————————
const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');
const client = require('../../bot');
const embedCreate = require('../../handlers/embedCreate');

module.exports = {
    name: "Tattoos",
    aliases: ["tattoos"],
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
            
            embedCreate.NSFWEmbed(client, message);
            return;
        
        } else {

            try {
                async function getImage() {
                    // Subreddits
                    var Responses = [
                        "GirlswithTatsGW",
                        "altgonewild",
                        "Hotchickswithtattoos",
                        "nsfw_tattoos",
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
                            title: `${client.emotes.NSFW1}| Tattoos || ${Responses[Response]}`,
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
                            color: client.colores.embedNsfw,
                        }
                        message.channel.send({ embeds: [Nsfw_embed] })
                        message.channel.send(link).then(embedMessage => {
                            embedMessage.react(client.emotes.boobs1)
                            .then(() => embedMessage.react(client.emotes.boobs2))
                            .then(() => embedMessage.react(client.emotes.assclap1))
                            .then(() => embedMessage.react(client.emotes.slapAss2))
                            .then(() => embedMessage.react(client.emotes.NoGodNo))
                        })
                        return;
                    }
                    // Create embed
                    let Nsfw_embed = new MessageEmbed()
                        .setColor(client.colores.embedNsfw)
                        .setURL(link)
                        .setTitle(`${client.emotes.NSFW1}| Tattoos || ${Responses[Response]}`)
                        .addField("Tytuł:", title)
                        .addField("Autor:", author, false)
                        .addField("Głosy:", `👍| ${score}`, true)
                        .addField("Komentarze:", `💬| ${comments}`, true)
                        .setImage(allowed[randomnumber].data.url)
                        .setTimestamp()
                        .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` })
                        
                        message.channel.send({ embeds: [Nsfw_embed] }).then(embedMessage => {
                            embedMessage.react(client.emotes.boobs1)
                            .then(() => embedMessage.react(client.emotes.boobs2))
                            .then(() => embedMessage.react(client.emotes.assclap1))
                            .then(() => embedMessage.react(client.emotes.slapAss2))
                            .then(() => embedMessage.react(client.emotes.NoGodNo))
                        });
                }
                getImage();
            } catch (err) {
               
                let ErrType = 'normal';
                
                embedCreate.NSFWEmbed(client, message, err, ErrType);
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