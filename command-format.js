module.exports = {
   name: "nameOfTheCommand", // Name Of The Command
   aliases: ["alias1", "alias2", "alias3"], // Aliases For Command.
   cooldowns: 1000, // Cooldown For The Command [Milliseconds]
   description: "This Command Tells About You", // Description Of The Command [The Purpose Etc...]
   usage: "<user>", // Usage For Command. [like ?nameOfTheCommand <user> <reason>]
   toggleOff: false, // Disable The Command If Emergency. [true = off | false = on]
   developersOnly: false, // If Command Is Only For Bot Owners. [true = yes | false = no]
   premiumOnly: false, // Enable use of the command, for premium servers. [true = off | false = on].
   inVoiceChannel: false, // Enable to use command if user is on voice channel. [true = off | false = on].
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"], // Permissions Required For The Author To Use The CMD.
   botpermissions: ["ADMINISTRATOR"], // Permissions Required For The Bot To Run The CMD.

   run: async (client, message, args) => {
      // Command code
   },
};
