// ———————————————[Packages]———————————————
const { MessageEmbed } = require("discord.js");
const { dbConnect } = require('../../handlers/dbConnection');
const { readdirSync } = require("fs");
const ms = require("ms");
const client = require('../../bot');
const i18n = require('../../handlers/i18n');

// ———————————————[Variables]———————————————
let conn;
conn = dbConnect();

module.exports = {
   name: "Cmdhelp",
   aliases: ["ch", "chelp", "cmdhelp"],
   description: i18n.__("cmdhelp.description"),
   usage: i18n.__("cmdhelp.usage"),
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
            console.log(chalk.grey('[') + chalk.redBright('Command: CmdHelp ERROR') + chalk.grey('] '));
            console.log(err1);
            return;
         }
         
         // If the query result is greater than 0
         if (res1.length > 0) {
            
            // Saves the value of the prefix variable as the prefix from the query
            const prefix = res1[0].guildPrefix;
            
            // If no argument is given
            if (!args[0]) {

               // Deleting user messages 
               message.delete()
               
               let Embed = new MessageEmbed()
               .setColor(client.colores.embedError)
               .setTitle(client.emotes.boxno + i18n.__("cmdhelp.noargs"))
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

                        // Deleting user messages 
                        
                        message.delete();
                        
                        // Creating an embed 
                        let Embed = new MessageEmbed()
                        .setColor(client.colores.embedError)
                        .setTitle(client.emotes.boxno + i18n.__("cmdhelp.nameMissing"))
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
                        name: `${cmds.length === 0 ? i18n.__("cmdhelp.progress") : co.cname}`,
                        value: co.des ? co.des : i18n.__("cmdhelp.descMissing"),
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
                     .setColor(client.colores.embedError)
                     .setTitle(client.emotes.boxno + i18n.__("cmdhelp.notFound"))
                     .setDescription(i18n.__("cmdhelp.notFoundDesc"))
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
                  .setColor(client.colores.embedInfo)
                  .setTitle(i18n.__("cmdhelp.Info"))
                  
                  // Adding command name information to the embed
                  .addField(
                     i18n.__("cmdhelp.Info2"),
                     command.name ? `${command.name}` :  i18n.__("cmdhelp.Info3")
                  )

                  // Adding command alias information to the embed
                  .addField(
                     i18n.__("cmdhelp.Info4"),
                     command.aliases
                        ? `${command.aliases.join(" ,")}`
                        : i18n.__("cmdhelp.Info5")
                  )

                  // Adding command cooldown information to the embed
                  .addField(
                     i18n.__("cmdhelp.Info6"),
                     command.cooldowns ? `${ms(command.cooldowns)}` : i18n.__("cmdhelp.Info7")
                  )

                  // Adding command description information to the embed
                  .addField(
                     i18n.__("cmdhelp.Info8"),
                     command.description
                        ? command.description
                        : i18n.__("cmdhelp.Info9")
                  )

                  // Adding information to the embed about how to use the command
                  .addField(
                     i18n.__("cmdhelp.Info10"),
                     command.usage
                        ? `${prefix}${command.name} ${command.usage}`
                        : `${prefix}${command.name}`
                  )

                  // Adding information to the embed whether the command is for premium servers
                  .addField(
                     i18n.__("cmdhelp.Info11"),
                     command.premiumOnly
                        ? i18n.__("cmdhelp.Info12")
                        : i18n.__("cmdhelp.Info13")
                  )

                  // Adding to the embed information what is the status of the command
                  .addField(
                     i18n.__("cmdhelp.Info14"),
                     command.toggleOff
                        ? i18n.__("cmdhelp.Info15")
                        : i18n.__("cmdhelp.Info16")
                  )

                  // Adding information to the embed whether the command is for developers only 
                  .addField(
                     i18n.__("cmdhelp.Info17"),
                     command.developersOnly 
                        ?  i18n.__("cmdhelp.Info18")
                        :  i18n.__("cmdhelp.Info19")
                  )

                  // Adding information about required bot permissions to the embed
                  .addField(
                     i18n.__("cmdhelp.Info20"),
                     command.botpermissions
                        ? `${command.botpermissions.join(", ")}`
                        : i18n.__("cmdhelp.Info21")
                  )

                  // Add information about required user rights to the embed
                  .addField(
                     i18n.__("cmdhelp.Info22"),
                     command.userpermissions
                        ? `${command.userpermissions.join(", ")}`
                        : i18n.__("cmdhelp.Info23")
                  )

                  .setTimestamp()
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