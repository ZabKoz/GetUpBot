// ———————————————[Packages]———————————————
require('dotenv').config();
const mysql = require('mysql');
const chalk = require('chalk');

/**
 * 
 * @INFO
 * Why not "mysql.createConnection"
 * 
 * The problem is that your bot crashes when it encounters a connection timeout.
 * The MySQL server doesn't go offline, just your connection to it does. Meaning
 * that when you restart your bot it reconnects and everything works.
 * 
 * 🔗 I encountered two ways of getting around the issue of having to restart the bot manually.
 * 
 * 1️⃣ Set up your bot so that it restarts automatically when it encounters a critical error.
 * (Not really the best option but if you want to do it that way it works)
 * 
 * 2️⃣ Create a connection pool.
 * 
 * This is by far the better option. It will create a pool of connections ready to go.
 * When you need a connection it will provide you with one and release it after you are done.
 * That way your connection won't time out.
 */

const conn = mysql.createPool({
    host: process.env.dbHost,
    port: process.env.dbPort,
    user: process.env.dbUsername,
    password: process.env.dbPassword,
    database: process.env.dbDatabase,
});

conn.getConnection(function (err) {
    if (err) {
        // Error message when trying to connect bot to database
        console.log(
            chalk.gray('—————————————————') +
            chalk.white('[') + chalk.red('Błąd Database') + chalk.white(']') + 
            chalk.gray('—————————————————')
        );

        // Display error in terminal
        console.log(err);
        
        return;
    } 
    console.log(
        chalk.gray('—————————————————') +
        chalk.white('[') + chalk.red('Informacje Database') + chalk.white(']') + 
        chalk.gray('—————————————————')
    );
    
    // Information about bot connection to the database and display of which database
    console.log(chalk.gray('Połączono do bazy: '), chalk.red.underline.bold(process.env.dbDatabase));
});

module.exports = {
    dbConnect: () => {
        return conn;
    }
}

/**
 * 
 * @INFO
 * Website Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */