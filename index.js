const { Telegraf } = require('telegraf');
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN);
bot.launch();
(bot)
    .on('text', ctx => {
        console.log(`Ты написал: ${JSON.stringify(ctx, null, 4)}`);
    });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));