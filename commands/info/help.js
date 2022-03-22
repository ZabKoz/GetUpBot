// ———————————————[Packages]———————————————
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = require('../../bot');
const helpemoji = require('../../config/help.json');
const i18n = require('../../handlers/i18n');

module.exports = {
    name: "Help",
    aliases: ["help", "h"],
    description: i18n.__("help.description"),
    usage: "",
    cooldowns: 2000,
    premiumOnly: false,
    developersOnly: false,
    toggleOff: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        
        // Collect information about all folders commands
        const directories = [
            ...new Set(client.commands.map((cmd) => cmd.directory)),
        ];

        //
        const formatString = (str) => {
            return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
        };

        // If the command has no name and description, display information about it
        const categories = directories.map((dir) => {
            const getCommands = client.commands
               .filter((cmd) => cmd.directory === dir)
               .map((cmd) => {
                  return {
                     name: cmd.name ? cmd.name : i18n.__mf("help.nameMissing"),
                     description: cmd.description
                        ? cmd.description
                        : i18n.__mf("help.descMissing"),
                  };
               });

            return {
               directory: formatString(dir),
               commands: getCommands,
            };
        });

        // Sending an embed with information about selecting a command category
        const embed = new MessageEmbed()
            .setColor(client.colores.embedInfo)
            .setTitle(i18n.__mf("help.Title", { clientName: process.env.clientName}) + ` [${client.commands.size}]`)
            .setDescription(i18n.__mf("help.Desc"))
            .setTimestamp()
            .setFooter(
               {
                  text: `${process.env.clientName} -> ${message.author.tag}`,
                  iconURL: `${process.env.clientAvatar}`
               }
            );
        
        // Component responsible for displaying all categories
         const components = (state) => [
            new MessageActionRow().addComponents(
               new MessageSelectMenu()
                  .setCustomId("help-menu")
                  .setPlaceholder(i18n.__mf("help.Desc"))
                  .setDisabled(state)
                  .addOptions([
                     categories.map((cmd) => {
                        return {
                           label: `${cmd.directory}`,
                           value: `${cmd.directory.toLowerCase()}`,
                           emoji: `${helpemoji[cmd.directory.toLowerCase()]}`,
                           description: `${i18n.__mf("help.Desc2")} ${cmd.directory}!`,
                        };
                     }),
                  ])
            ),
         ];

        // Sending an embed message with a component
         const inMessage = await message.channel.send({
            embeds: [embed],
            components: components(false),
         });

         // Filter to check if the user responsible for sending the command is the one who changes the category
         const filter = (interaction) => interaction.user.id === message.author.id;
         
         // Set a timeout of 1 minute for interactions
         const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: "SELECT_MENU",
            time: 60000,
         });

        // After selecting a category, display all available commands
         collector.on("collect", (interaction) => {
            const [directory] = interaction.values;
            const category = categories.find(
               (x) => x.directory.toLowerCase() === directory
            );
            
            const embed2 = new MessageEmbed()
               .setColor(client.colores.embedInfo)
               .setTitle(`${directory.charAt(0).toUpperCase()}${directory.slice(1).toLowerCase()}`)
               .setDescription(
                  "" + category.commands.map((cmd) => `➥ | \`${cmd.name}\` (*${cmd.description}*)`).join("\n ")
               )
               .setTimestamp()
               .setFooter(
                  {
                     text: `${process.env.clientName} -> ${message.author.tag}`,
                     iconURL: `${process.env.clientAvatar}`
                  }
               );

            interaction.update({ embeds: [embed2] });
         });

         collector.on("end", () => {
            inMessage.edit({ components: components(true) });
         });
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