// ———————————————[Packages]———————————————
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = require('../../bot');
const { embedInfo } = require('../../config/color.json');
const helpemoji = require('../../config/help.json');

module.exports = {
    name: "help",
    aliases: ["h", "pomoc"],
    description: "Lista Komend",
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
                     name: cmd.name ? cmd.name : `Brak nazwy komendy`,
                     description: cmd.description
                        ? cmd.description
                        : `Brak opisu komendy`,
                  };
               });

            return {
               directory: formatString(dir),
               commands: getCommands,
            };
        });

        // Sending an embed with information about selecting a command category
        const embed = new MessageEmbed()
            .setTitle(`${process.env.clientName || "Bot"} Komendy`)
            .setDescription(`Proszę wybrać jedną z opcji z poniższej listy!`)
            .setColor(embedInfo)
            .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` })
            .setTimestamp();
        
        // Component responsible for displaying all categories
         const components = (state) => [
            new MessageActionRow().addComponents(
               new MessageSelectMenu()
                  .setCustomId("help-menu")
                  .setPlaceholder(`Proszę wybrać kategorię!`)
                  .setDisabled(state)
                  .addOptions([
                     categories.map((cmd) => {
                        return {
                           label: `${cmd.directory}`,
                           value: `${cmd.directory.toLowerCase()}`,
                           emoji: `${helpemoji[cmd.directory.toLowerCase()]}`,
                           description: `Komendy z kategori ${cmd.directory}!`,
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
               .setTitle(`${directory.charAt(0).toUpperCase()}${directory.slice(1).toLowerCase()}`)
               .setDescription(
                  "" + category.commands.map((cmd) => `✪ | \`${cmd.name}\` (*${cmd.description}*)`).join("\n ")
               )
               .setColor(embedInfo)
               .setFooter({ text: `${process.env.clientName} -> ${message.author.tag}`, iconURL: `${process.env.clientAvatar}` });

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