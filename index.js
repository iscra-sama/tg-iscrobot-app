const { Telegraf } = require('telegraf');
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN);
bot.launch({
    polling: {
        port: process.env.PORT || 8080,
        domain: process.env.DOMAIN
    }
});
(bot)
    .command("iscrodbg", async ctx => {
        await ctx.reply(`Ви напейсали: ${ctx.message.text}`);
    })
    .on("text", ctx => {
        console.log(`Ви напейсали: ${ctx.message.text}`);
    })

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));