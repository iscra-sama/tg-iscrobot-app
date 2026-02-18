const express = require("express");
const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN);
const app = express();

app.listen(process.env.PORT || 8080);
app.use((async () => await bot.createWebhook({
    domain: process.env.DOMAIN
}))());
app.get(/.*/, (req, res) => {
    res.end("Hello, Iscra-chan!");
});
(bot)
    .command("iscroecho", async ctx => {
        await ctx.reply(`Ви напейсали: ${ctx.message.text}`);
    })
    .on("text", ctx => {
        console.log(`Ви напейсали: ${ctx.message.text}`);
    });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));