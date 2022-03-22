const { Client, CommandInteraction } = require("discord.js");
const client = require('../../bot');
const i18n = require('../../handlers/i18n');

module.exports = {
   name: "ping",
   description: i18n.__("ping.description"),
   type: "CHAT_INPUT",
   run: async (client, interaction, args, message) => {
      interaction.followUp({ content: `${i18n.__mf("ping.result", { ping: client.ws.ping })}` });
   },
};
