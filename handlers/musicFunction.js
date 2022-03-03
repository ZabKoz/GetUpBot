// ———————————————[Packages]———————————————
const { DisTube } = require('distube');
const { SoundCloudPlugin} = require('@distube/soundcloud');
const { SpotifyPlugin} = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const client = require('../bot');
const { MessageEmbed } = require('discord.js');

// ———————————————[Handler code]———————————————
client.distube = new DisTube(client, {
    leaveOnStop: false, // If the music is stopped it should output [true = on | false = off].
    leaveOnFinish: true, // If the bot finishes playing it should exit [true = on | false = off].
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    youtubeDL: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true,
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ],
});

module.exports = client;

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */