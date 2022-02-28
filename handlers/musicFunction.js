// ———————————————[Packages]———————————————
const { DisTube } = require('distube');
const { SoundCloudPlugin} = require('@distube/soundcloud');
const { SpotifyPlugin} = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const client = require('../bot');
const { MessageEmbed } = require('discord.js');

client.distube = new DisTube(client, {
    leaveOnStop: false,
    leaveOnFinish: true,
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