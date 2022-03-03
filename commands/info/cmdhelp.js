// ———————————————[Packages]———————————————
const { MessageEmbed } = require("discord.js");
const { dbConnect } = require('../../handlers/dbConnection');
const { readdirSync } = require("fs");
const ms = require("ms");
const client = require('../../bot');

// ———————————————[Variables]———————————————
let conn;
conn = dbConnect();

module.exports = {
   name: "cmdhelp",
   aliases: ["ch", "chelp"],
   description: "Informacje o komendzie",
   usage: "<nazwa-komendy>",
   cooldowns: 2000,
   premiumOnly: false,
   developersOnly: false,
   toggleOff: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   run: async (client, message, args) => {
      // Query the database for the prefix for a given server
      conn.query("SELECT * FROM guildPrefix WHERE guildId = ?", [message.guild.id], async (err1, res1) => {
         // If there is an error display it
         if (err1) {
            console.log(`Error #1 CmdHelp`);
            console.log(err1);
            return;
         }
         // If the query result is greater than 0
         if (res1.length > 0) {
            // Saves the value of the prefix variable as the prefix from the query
            const prefix = res1[0].guildPrefix;
            // If no argument is given
            if (!args[0]) {
               message.delete()
               let Embed = new MessageEmbed()
               .setColor(client.colores.embedError)
               .setTitle(`:x: | Proszę podać nazwę polecenia`)
               .setTimestamp()
               .setFooter(
                  {
                     text: `${process.env.clientName} -> ${message.author.tag}`,
                     iconURL: `${process.env.clientAvatar}`
                  }
               )
               message.channel.send({ embeds: [Embed] }).then(msg => {
                  setTimeout(() => msg.delete(), 10000)
               });
            } else {
               let cots = [];
               let catts = [];
               // Loading all folders
               readdirSync("./commands/").forEach((dir) => {
                  // 
                  if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                  // Load all files in a folder with the suffix ".js"
                  const commands = readdirSync(`./commands/${dir}`).filter((file) =>
                     file.endsWith(".js")
                  );
                  // Create a map of all command files 
                  const cmds = commands.map((command) => {
                     let file = require(`../../commands/${dir}/${command}`);
                     // If there is no such command name, send the information
                     if (!file.name){
                        // Deleting a message with a command name
                        message.delete();
                        // Creating an embed 
                        let Embed = new MessageEmbed()
                        .setColor(client.colores.embedError)
                        .setTitle(`:x: | Brak nazwy polecenia`)
                        .setTimestamp()
                        .setFooter(
                           {
                              text: `${process.env.clientName} -> ${message.author.tag}`,
                              iconURL: `${process.env.clientAvatar}`
                           }
                        );
                        // Send embed with deletion after 10 seconds
                        message.channel.send({ embeds: [Embed] }).then(msg => {
                           setTimeout(() => msg.delete(), 10000)
                        });
                     }
                     // Changing the filename from (end) ".js" to " "
                     let name = file.name.replace(".js", "");
                     // Extracting command information
                     let des = client.commands.get(name).description;
                     let emo = client.commands.get(name).emoji;
                     // 
                     let obj = {
                        cname: `${emo ? emo : ""} - \`${name}\``,
                        des,
                     };
                     
                     return obj;
                  });
      
                  let dota = new Object();
      
                  cmds.map((co) => {
                     dota = {
                        name: `${cmds.length === 0 ? `W toku` : co.cname}`,
                        value: co.des ? co.des : `Brak opisu`,
                        inline: true,
                     };
                     catts.push(dota);
                  });
      
                  cots.push(dir.toLowerCase());
               });
               // Finding command by alias
               const command =
                  client.commands.get(args[0].toLowerCase()) ||
                  client.commands.find(
                     (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                  );
      
               if (cots.includes(args[0].toLowerCase())) {
                  return;
               }
               // If command not found
               if (!command) {
                  // Creating an embed 
                  const embed = new MessageEmbed()
                     .setTitle(`:x: | Złe polecenie! Używam ${prefix}help dla wszystkich moich poleceń!`)
                     .setColor(client.colores.embedError)
                     .setTimestamp()
                     .setFooter(
                        {
                           text: `${process.env.clientName} -> ${message.author.tag}`,
                           iconURL: `${process.env.clientAvatar}`
                        }
                     );
                  // Send embed with deletion after 10 seconds
                  message.channel.send({ embeds: [embed] }).then(msg => {
                     setTimeout(() => msg.delete(), 10000)
                  });
                  // Discontinue further operations
                  return;
               }
               // Creating an embed 
               const embed = new MessageEmbed()
                  .setTitle(`Szczegóły polecenia:`)
                  .setTimestamp()
                  .setColor(client.colores.embedRandom)

                  // Adding command name information to the embed
                  .addField(
                     `Komenda:`,
                     command.name ? `${command.name}` : `Brak nazwy dla tego polecenia`
                  )

                  // Adding command alias information to the embed
                  .addField(
                     `Aliasy:`,
                     command.aliases
                        ? `${command.aliases.join(" ,")}`
                        : `Brak aliasów dla tego polecenia.`
                  )

                  // Adding command cooldown information to the embed
                  .addField(
                     `Spowolnienia:`,
                     command.cooldowns ? `${ms(command.cooldowns)}` : `Brak`
                  )

                  // Adding command description information to the embed
                  .addField(
                     `Opis:`,
                     command.description
                        ? command.description
                        : `Brak opisu dla tego polecenia.`
                  )

                  // Adding information to the embed about how to use the command
                  .addField(
                     `Użycie:`,
                     command.usage
                        ? `${prefix}${command.name} ${command.usage}`
                        : `${prefix}${command.name}`
                  )

                  // Adding information to the embed whether the command is for premium servers
                  .addField(
                     `Premium:`, command.premiumOnly ? `Tak` : `Nie`
                  )

                  // Adding to the embed information what is the status of the command
                  .addField(
                     `Status komendy:`,
                     command.toggleOff ? `Offline` : `Online`
                  )

                  // Adding information to the embed whether the command is for developers only 
                  .addField(`Tylko dla developerów:`, command.developersOnly ? `Tak` : `Nie`)

                  // Adding information about required bot permissions to the embed
                  .addField(
                     `Wymagane uprawnienia bota:`,
                     command.botpermissions
                        ? `${command.botpermissions.join(", ")}`
                        : `Brak`
                  )

                  // Add information about required user rights to the embed
                  .addField(
                     `Wymagane uprawnienia użytkownika:`,
                     command.userpermissions
                        ? `${command.userpermissions.join(", ")}`
                        : `Brak`
                  )

                  .setFooter(
                     {
                        text: `${process.env.clientName} -> ${message.author.tag}`,
                        iconURL: `${process.env.clientAvatar}`
                     }
                  );

               // Sending an embed
               message.channel.send({ embeds: [embed] });
            };
         };
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