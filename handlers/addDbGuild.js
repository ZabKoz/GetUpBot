// ———————————————[Packages]———————————————
const { dbConnect } = require('./dbConnection.js');
const chalk = require('chalk');

let conn
conn = dbConnect()

module.exports = {
    // Function responsible for checking if a server exists and adding it
    addDbGuild: (guildId) => {
        // Checking if a server exists in the guildPrefix table
        conn.query("SELECT * FROM guildPrefix WHERE guildId = ?", [guildId], (err, res) => {
            // If the result is 0
            if (res.length == 0) {
                // Add a new record to the database
                conn.query("INSERT INTO guildPrefix (guildId, guildPrefix) VALUES (?, ?)", [guildId, process.env.clientPrefix]);
                // Display in the terminal information about the addition of
                console.log(chalk.gray('Dodano: ') + chalk.red.underline.bold(`${guildId} `) + chalk.gray('do tabeli prefix'));
            };
        });
        // Checking if a server exists in the guildSettings table
        conn.query("SELECT * FROM guildSettings WHERE guildId = ?", [guildId], (err, res1) => {
            // If the result is 0
            if (res1.length == 0) {
                // Add a new record to the database
                conn.query("INSERT INTO guildSettings (guildId) VALUES (?)", [guildId]);
                // Display in the terminal information about the addition of
                console.log(chalk.gray('Dodano: ') + chalk.red.underline.bold(`${guildId} `) + chalk.gray('do tabeli ustawień'));
            };
        });
        // Checking if a server exists in the guildPremium table
        conn.query("SELECT * FROM guildPremium WHERE guildId = ?", [guildId], (err, res2) => {
            // If the result is 0
            if (res2.length == 0) {
                // Add a new record to the database
                conn.query("INSERT INTO guildPremium (guildId, premium) VALUES (?, ?)", [guildId, 'false']);
                // Display in the terminal information about the addition of
                console.log(chalk.gray('Dodano: ') + chalk.red.underline.bold(`${guildId} `) + chalk.gray('do tabeli premium'));
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