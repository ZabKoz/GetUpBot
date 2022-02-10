// ———————————————[Packages]———————————————
const { dbConnect } = require('./dbConnection');
const ms = require('ms');
const client = require('../bot');
const chalk = require('chalk');
const canvasCreate = require('./canvasCreate');
const embedCreate = require('./embedCreate');

// ———————————————[Variables]———————————————
let conn;
conn = dbConnect();

const cooldown = new Set();

module.exports = {
    handleMessages: async (message, conn, res2, client) => {
        const member = message.member;

        // Checking if Leveling is enabled in the database
        if (res2[0].levelingEnabled === 'true') {
            handleLeveling(message, member);
        };

    },
};

function handleLeveling(message, member, client) {
    // Checking the details of the user sending the message
    conn.query("SELECT * FROM guildLeveling WHERE guildId = ? AND userId = ?", [message.guild.id, member.id],(err2, query2) => {
        // Checking the database for "levelingDisplayMode"
        conn.query("SELECT levelingDisplayMode FROM guildSettings WHERE guildId = ?", [message.guild.id], async (err1, query1) => {
            // Extracting information about a user's exp
            let xptoget = query2.length == 0 ? 400 : query2[0].userLevel * 400;
            // Exp calculation
            let xptogive = Math.floor(Math.random() * 15) + 5;
            // Adding cooldown per user on a given server
            if (cooldown.has(`${message.author.id}:${message.guild.id}`)) return;
            // Checking in the database if the search gave a result equal to 0
            if (query2.length == 0) {
                // Adding a user to the database
                conn.query("INSERT INTO guildLeveling (guildId, userId, userPrestige, userLevel, userXP, hasRecievedXP, userRank) VALUES (?, ?, ?, ?, ?, ?, ?)", [message.guild.id, message.author.id, 0, 1, xptogive, "false", "COPPER IV"]);
                // Adding cooldown per user on a given server
                cooldown.add(`${message.author.id}:${message.guild.id}`);
                // Information in the console about adding a user
                console.log(
                    chalk.gray('Dodano użytkownika: ') + chalk.red.underline.bold(`${member.displayName} || ${member.id}`) +
                    chalk.gray(' na serverze: ') + chalk.red.underline.bold(`${message.guild.name} || ${message.guild.id}`)
                );
            } else {
                query2 = query2[0];
                query1 = query1[0];
                // xpadd is responsible for adding user exp and the calculated "xptogive"
                const xpadd = query2.userXP + xptogive;
                // Updating data in the database
                conn.query("UPDATE guildLeveling SET userXP = ? WHERE guildId = ? AND userId = ?", [xpadd, message.guild.id, member.id], async () => {
                    // Adding cooldown per user on a given server
                    cooldown.add(`${message.author.id}:${message.guild.id}`);
                    // Checking if the user has a higher level and "levelingDisplayMode" is set to "image"
                    if (query2.userXP >= xptoget && query1.levelingDisplayMode == "image") {
                        
                        canvasCreate.CanvasLevelingUp(message, member, conn, query2);
                    // Checking if the user has a higher level and "levelingDisplayMode" is set to "text"  
                    } else if (query2.userXP >= xptoget && query1.levelingDisplayMode == "text") {
                        
                        embedCreate.EmbedLevelingUp(message, member, conn, query2);
                    };
                });

                // Remove cooldown for user on server after 5s
                setTimeout(() => {
                    cooldown.delete(`${message.author.id}:${message.guild.id}`)
                }, ms("5s"));
            };
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