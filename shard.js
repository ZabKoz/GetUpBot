require('dotenv').config();

const { ShardingManager, Shard } = require('discord.js');
const chalk = require('chalk');


let manager = new ShardingManager('./bot.js', {
    token: process.env.clientToken,
    totalShards: 'auto',
});
console.clear();
console.log(chalk.gray('GGGGGGGGGGGGG                             tttt               UUUUUUUU     UUUUUUUU                         BBBBBBBBBBBBBBBBB                             tttt          '));
console.log(chalk.gray('GGG::::::::::::G                          ttt:::t               U::::::U     U::::::U                         B::::::::::::::::B                         ttt:::t          '));
console.log(chalk.gray('GG:::::::::::::::G                          t:::::t               U::::::U     U::::::U                         B::::::BBBBBB:::::B                        t:::::t          '));
console.log(chalk.gray('G:::::GGGGGGGG::::G                          t:::::t               UU:::::U     U:::::UU                         BB:::::B     B:::::B                       t:::::t          '));
console.log(chalk.gray('G:::::G       GGGGGG    eeeeeeeeeeee    ttttttt:::::ttttttt          U:::::U     U:::::U ppppp   ppppppppp          B::::B     B:::::B   ooooooooooo   ttttttt:::::ttttttt    '));
console.log(chalk.gray('G:::::G                ee::::::::::::ee  t:::::::::::::::::t          U:::::D     D:::::U p::::ppp:::::::::p         B::::B     B:::::B oo:::::::::::oo t:::::::::::::::::t    '));
console.log(chalk.gray('G:::::G               e::::::eeeee:::::eet:::::::::::::::::t          U:::::D     D:::::U p:::::::::::::::::p        B::::BBBBBB:::::B o:::::::::::::::ot:::::::::::::::::t    '));
console.log(chalk.gray('G:::::G    GGGGGGGGGGe::::::e     e:::::etttttt:::::::tttttt          U:::::D     D:::::U pp::::::ppppp::::::p       B:::::::::::::BB  o:::::ooooo:::::otttttt:::::::tttttt    '));
console.log(chalk.gray('G:::::G    G::::::::Ge:::::::eeeee::::::e      t:::::t                U:::::D     D:::::U  p:::::p     p:::::p       B::::BBBBBB:::::B o::::o     o::::o      t:::::t          '));
console.log(chalk.gray('G:::::G    GGGGG::::Ge:::::::::::::::::e       t:::::t                U:::::D     D:::::U  p:::::p     p:::::p       B::::B     B:::::Bo::::o     o::::o      t:::::t          '));
console.log(chalk.gray('G:::::G        G::::Ge::::::eeeeeeeeeee        t:::::t                U:::::D     D:::::U  p:::::p     p:::::p       B::::B     B:::::Bo::::o     o::::o      t:::::t          '));
console.log(chalk.gray('G:::::G       G::::Ge:::::::e                 t:::::t    tttttt      U::::::U   U::::::U  p:::::p    p::::::p       B::::B     B:::::Bo::::o     o::::o      t:::::t    tttttt'));
console.log(chalk.gray('G:::::GGGGGGGG::::Ge::::::::e                t::::::tttt:::::t      U:::::::UUU:::::::U  p:::::ppppp:::::::p     BB:::::BBBBBB::::::Bo:::::ooooo:::::o      t::::::tttt:::::t'));
console.log(chalk.gray('GG:::::::::::::::G e::::::::eeeeeeee        tt::::::::::::::t       UU:::::::::::::UU   p::::::::::::::::p      B:::::::::::::::::B o:::::::::::::::o      tt::::::::::::::t'));
console.log(chalk.gray('GGG::::::GGG:::G  ee:::::::::::::e          tt:::::::::::tt         UU:::::::::UU     p::::::::::::::pp       B::::::::::::::::B   oo:::::::::::oo         tt:::::::::::tt'));
console.log(chalk.gray('   GGGGGG   GGGG    eeeeeeeeeeeeee            ttttttttttt             UUUUUUUUU       p::::::pppppppp         BBBBBBBBBBBBBBBBB      ooooooooooo             ttttttttttt  '));
console.log(chalk.gray('                                                                                      p:::::p                                                                             '));
console.log(chalk.gray('                                                                                      p:::::p                                                                             '));
console.log(chalk.gray('                                                                                     p:::::::p                                                                            '));
console.log(chalk.gray('                                                                                     p:::::::p                                                                            '));
console.log(chalk.gray('                                                                                     p:::::::p                                                                            '));
console.log(chalk.gray('                                                                                     ppppppppp                                                                            '));
                                                                                     
manager.on('shardCreate', (shard) => {
    console.log(
        chalk.gray('———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————')
    );

    console.log(
        chalk.grey('[') + chalk.greenBright('SHARDS') + chalk.grey('] ') + chalk.gray(`Launched shard `) + chalk.red.bold(`${shard.id}`)
    );

});

manager.spawn();

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */