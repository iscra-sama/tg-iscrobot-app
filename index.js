const { Telegraf } = require('telegraf');
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN);
bot.launch({
    webhook: {
        port: process.env.PORT,
        domain: process.env.DOMAIN
    }
});
(bot)
    .command("iscrodbg", async ctx => {
        await ctx.reply(`Ви напейсали: ${ctx.message.text}`);
    });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));