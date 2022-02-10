module.exports = {
    EmbedLevelingUp: async (message, member, conn, query2) => {
        EmbedLevelingUp(message, member, conn, query2);
        // Finish later
    },
};

function EmbedLevelingUp(message, member, conn, query2) {
    
    // ———————————————[Packages]———————————————
    const { MessageEmbed } = require('discord.js');
    const { embedError, embedInfo, embedUp, embedUp1 } = require('../config/color.json');
    const client = require('../bot');
       
    // Adding a user level
    conn.query("UPDATE guildLeveling SET userLevel = ? WHERE guildId = ? AND userId = ?", [query2.userLevel + 1, message.guild.id, member.id], () => {
        // Gather information about the channel "levelingChannel"
        conn.query("SELECT levelingChannel FROM guildSettings WHERE guildId = ?", [message.guild.id], async (err1, res1) => {
            // Collect information about "userXP" and "userPrestige" 
            conn.query("SELECT * FROM guildLeveling WHERE guildId = ? ORDER BY userXP AND userPrestige", [message.guild.id], async (err2, res2) => {
                // Collect information about the user who sent the message from a given server
                conn.query("SELECT * FROM guildLeveling WHERE guildId = ? AND userId = ?", [message.guild.id, member.id], async (err3, res3) => {
                    if (err1 || err2 || err3) {
                        // View filename and error: err1
                        if (err1) {
                            console.log(`Error #1 embedCreate`);
                            console.log(err1);
                        };
                        // View filename and error: err2
                        if (err2) {
                            console.log(`Error #2 embedCreate`);
                            console.log(err2);
                        };
                        // View filename and error: err3
                        if (err3) {
                            console.log(`Error #3 embedCreate`);
                            console.log(err3);
                        };
                        // Discontinue further operations
                        return;
                    };
                    async function createLevelUp() {
                        if (res1[0].levelingChannel === null) {
                            if (highestUser.userId == message.author.id) {
                                const levelNeeded = "Jesteś 1"
                                let lvlup_first = new MessageEmbed()
                                    .setColor(embedUp1)
                                    .setTitle(`Gratulacje awansowałeś na wyższy poziom!`)
                                    .setDescription(
                                        `
                                            Aktualnie jesteś najlepszy na ${message.guild.name}!\n
                                            Twój poziom to ${userLevel}
                                            Twoja ranga to ${user}
                                        `)
                                    .setThumbnail()
                                    .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
                                message.channel.send({ embeds: [lvlup_first] });
                            } else {
                                const levelNeeded = "";
                                let lvlup_embed = new MessageEmbed()
                                    .setColor(embedUp)
                                    .setTitle(`Gratulacje awansowałeś na wyższy poziom!`)
                                    .setDescription(`Twój poziom to ${userLevel} Twoja ranga to ${user}`)
                                    .setTimestamp()
                                    .setFooter({ text: `${process.env.clientName}`, iconURL: `${process.env.clientAvatar}` })
                                message.channel.send({ embeds: [lvlup_embed] });
                            }
                        }
                    }
                    createLevelUp()
                });
            });
        });
    });
};
/** 
* @INFO
* Bot Coded by ZabKoz#2744
* @INFO
* Please mention me when you use this code!
*
*/