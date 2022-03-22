const { MessageEmbed } = require('discord.js');
const client = require('../../bot');
const embedCreate = require('../../handlers/embedCreate');
const i18n = require('../../handlers/i18n');

module.exports = {
    name: "Avatar",
    aliases: ["avatar"],
    cooldowns: 3000,
    description: i18n.__("avatar.description"),
    usage: "[@user]",
    toggleOff: false,
    developersOnly: false,
    premiumOnly: false,
    inVoiceChannel: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        let whoto = message.mentions.members.first() || message.member;
        let avatar_embed = new MessageEmbed()
            .setColor(client.colores.embedRandom)
            .setTitle(`Avatar`)
            .addField(
                `PNG`,
                `[Klik](${whoto.displayAvatarURL(
                    {
                        format: 'png',
                        dynamic: true
                    }
                )})`
            )
            .addField(
                `JPG`,
                `[Klik](${whoto.displayAvatarURL(
                    {
                        format: 'jpg',
                        dynamic: true
                    }
                )})`
            )
            .addField(
                `WEBP`,
                `[Klik](${whoto.displayAvatarURL(
                    {
                        format: 'webp',
                        dynamic: true
                    }
                )})`
            )
            .setImage(whoto.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter(
                {
                    text: `${process.env.clientName} -> ${message.author.tag}`,
                    iconURL: `${process.env.clientAvatar}`
                }
            );
            message.channel.send({ embeds: [avatar_embed] })
    },
 };
 