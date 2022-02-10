module.exports = {
    CanvasLevelingUp: async (message, member, conn, query2) => {
        CanvasLevelingUp(message, member, conn, query2);
    },
};

function CanvasLevelingUp(message, member, conn, query2) {
    // ———————————————[Packages]———————————————
    const { MessageAttachment } = require('discord.js');
    const Canvas = require('canvas');
    const { applyText } = require('./canvas');
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
                            console.log(`Error #1 canvasCreate`);
                            console.log(err1);
                        };
                        // View filename and error: err2
                        if (err2) {
                            console.log(`Error #2 canvasCreate`);
                            console.log(err2);
                        };
                        // View filename and error: err3
                        if (err3) {
                            console.log(`Error #3 canvasCreate`);
                            console.log(err3);
                        };
                        // Discontinue further operations
                        return;
                    };
                    
                    async function createLevelUp() {
                        // Variables on Background
                        let radiusCorner = '20'
                        let colorBackground = '#000000'
                        // Variables on Layer
                        let layerBackground = '#000000'
                        let opacityLayer = '0.4'
                        // Variables on Layer
                        let avatarBackground = '#000000'
                        // Variables on Level
                        let colorLevelBox = '#242424'
                        let opacityLevel = '1'
                        let colorLevel = '#ffff'
                        // Variables on Rank
                        let colorRankBox = '#242424'
                        let opacityRank = '1'
                        let colorRank = '#ffff'
                        // Variables on Username
                        let colorUsername = '#ffff'

                        // Creating a canvas
                        let canvas = Canvas.createCanvas(1080, 400);
                        ctx = canvas.getContext("2d");

                        // Variables and backend concerning
                        let Background = await Canvas.loadImage("./assets/images/level/level_up.jpg")

                        let Avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }))
                        
                        let userLevel = `${res3[0].userLevel}`

                        let rank = res2.sort((a, b) => {
                            return b.userXP - a.userXP
                        })

                        let userXP = res3[0].userXP

                        let ranking = rank.map(x => x.userXP).indexOf(userXP) + 1

                        const userRank = '#' + ranking

                        let userName = message.author.username.substr(0, 23)
                        
                        let userTag = message.author.discriminator


                        // Creating a canvas Background

                        ctx.beginPath();
                        ctx.moveTo(0 + Number(radiusCorner), 0);
                        ctx.lineTo(0 + 1080 - Number(radiusCorner), 0);
                        ctx.quadraticCurveTo(0 + 1080, 0, 0 + 1080, 0 + Number(radiusCorner));
                        ctx.lineTo(0 + 1080, 0 + 800 - Number(radiusCorner));
                        ctx.quadraticCurveTo(
                            0 + 1080,
                            0 + 800,
                            0 + 1080 - Number(radiusCorner),
                            0 + 800
                        );
                        ctx.lineTo(0 + Number(radiusCorner), 0 + 800);
                        ctx.quadraticCurveTo(0, 0 + 800, 0, 0 + 800 - Number(radiusCorner));
                        ctx.lineTo(0, 0 + Number(radiusCorner));
                        ctx.quadraticCurveTo(0, 0, 0 + Number(radiusCorner), 0);
                        ctx.closePath();
                        ctx.clip();
                        ctx.fillStyle = colorBackground
                        ctx.fillRect(0, 0, 1080, 800);

                        ctx.drawImage(Background, 0, 0, 1080, 800);
                        ctx.restore();
                        
                        // Creating a canvas Layer
                        ctx.fillStyle = layerBackground;
                        ctx.globalAlpha = opacityLayer;
                        ctx.fillRect(50, 0, 240, canvas.height);
                        ctx.globalAlpha = 1;

                        // Creating a canvas Avatar
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(170, 120, 90, 0, Math.PI * 2, false);
                        ctx.strokeStyle = avatarBackground;
                        ctx.stroke();
                        ctx.clip();
                        ctx.drawImage(Avatar, 50 + 30, 30, 180, 180);
                        ctx.restore();

                        // Creating a canvas Rank
                        ctx.fillStyle = colorRankBox;
                        ctx.globalAlpha = opacityRank;
                        ctx.fillRect(50 + 30, 30 + 180 + 30, 180, 50);
                        ctx.globalAlpha = 1;
                        ctx.fillStyle = colorRank;
                        ctx.font = applyText(canvas, 'Rank:' + userRank, 32, 170, "Blod");
                        ctx.textAlign = "center";
                        ctx.fillText('R: ' + userRank, 50 + 30 + 180 / 2, 30 + 180 + 30 + 38);

                        // Creating a canvas Level
                        ctx.fillStyle = colorLevelBox;
                        ctx.globalAlpha = opacityLevel;
                        ctx.fillRect(50 + 30, 30 + 180 + 30 + 50 + 30, 180, 50);
                        ctx.globalAlpha = 1;
                        ctx.fillStyle = colorLevel;
                        ctx.font = applyText(canvas, 'Lvl:' + userLevel, 32, 170, "Bold");
                        ctx.textAlign = "center";
                        ctx.fillText('L: ' + userLevel, 50 + 30 + 180 / 2, 30 + 180 + 30 + 30 + 50 + 38);
                        
                        // Creating a canvas Username
                        ctx.textAlign = 'right';
                        ctx.fillStyle = colorUsername;
                        ctx.font = applyText(canvas, userName, 45, 194, "Bold");
                        ctx.fillText(userName, canvas.width - 50 -5, 80);
                        
                        // Creating a canvas UserTag
                        ctx.textAlign = 'right';
                        ctx.fillStyle = colorUsername;
                        ctx.font = applyText(canvas, '#' + userTag, 35, 194, "Bold");
                        ctx.fillText('#' + userTag, canvas.width - 50 -5, 130);


                        const attachment = new MessageAttachment(canvas.toBuffer(), 'LvlUp.png');
                        if (res1[0].levelingChannel === null) {
                            client.channels.cache.get(`${message.channel.id}`).send({ files: [attachment] });
                        } else {
                            client.channels.cache.get(`${res1[0].levelingChannel}`).send({ files: [attachment] });
                        };
                    };
                    createLevelUp();
                });
            });
        });
    });
}