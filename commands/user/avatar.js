const { MessageEmbed } = require('discord.js');
const { embedError, embedRandom} = require('../../config/color.json');
const {} = require('../../config/emoji.json');

module.exports = {
    name: "Avatar",
    aliases: ["avatar"],
    cooldowns: 3000,
    description: "Pokazuje avatar",
    usage: "",
    toggleOff: false,
    developersOnly: false,
    premiumOnly: false,
    inVoiceChannel: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
 
    run: async (client, message, args) => {
        let whoto = message.mentions.members.first() || message.member;
        let avatar_embed = new MessageEmbed()
            .setColor(embedRandom)
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
 