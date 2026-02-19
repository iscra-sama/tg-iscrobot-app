const express = require("express");
const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN);
const app = express();

app.listen(process.env.PORT || 8080);
(async () =>
    app.use(await bot.createWebhook({
        domain: process.env.DOMAIN,
        port: process.env.PORT || 8080,
    }))
)();
app.get(/.*/, (req, res) => {
    res.end("Hello, Iscra-chan!");
});

let isHuurmoonecMuted = false;
(bot)
    .catch(err => {
        console.error("Error catched", err);
    })
    .command("iscroecho", async ctx => {
        await ctx.reply(`Ви напейсали: ${ctx.message.text}`);
    })
    .command("iscromute", async ctx => {
        let {status} = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
        let [_, flag, ...__] = (ctx.message.text).trim().split(" ");

        if (flag === undefined) {
            return await ctx.reply(`Заблокировать сообщения Huurmōnec. На данный момент ${isHuurmoonecMuted ? "" : "не"} забанен. Команда доступна админам. Работает по принципу удаления каждого поступающего от него сообщения. Доки: \n /iscromute -t (мут); \n /iscromute -f (размут); \n /iscromute -n (смена состояния на обратное);`);
        }
        switch (true) {
            case ctx.message.from.id === process.env.HUURMOONEC_ID:
                return await ctx.reply("Нѣтъ.");
            case status === "creator":
            case status === "administrator":
                break;
            default:
                return await ctx.reply("Увы, вы не администратор (v_v)\" — делегируйте это действие админу.");
        }
        if (__.length !== 0) {
            await ctx.reply(`Вы ввели невалидный набор символов после первого аргумента: ${__.join(" ")} (> <). Однако они были успешно отрезаны.`);
        }
        switch (flag) {
            case "-t":
                await ctx.reply("Huurmōnec заглушён.");
                isHuurmoonecMuted = true;
                break;
            case "-f":
                await ctx.reply("Huurmōnec может пейсать.");
                isHuurmoonecMuted = false;
                break;
            case "-n":
                await ctx.reply(`Право Huurmōnec изменено: теперь он ${isHuurmoonecMuted ? "может" : "не может"} писать.`)
                isHuurmoonecMuted = !isHuurmoonecMuted;
                break;
            default:
                await ctx.reply("Неверный аргумент команды. Читайте документацию (^^)\".");
        }
    })
    .on("message", async ctx => {
        console.log(`Ви напейсали: ${JSON.stringify(ctx.message, null, 4)}`);
        if (isHuurmoonecMuted && (ctx.message.from.id).toString() === process.env.HUURMOONEC_ID) {
            await ctx.deleteMessage();
        }
    });

(async () => {
    await bot.telegram.sendMessage(process.env.COVINOC_ID, "Я родился! ^___^ Причина: ты мя сейчас врубила и деплой окончен.");
    await bot.telegram.sendMessage(process.env.COVINOC_BUNKER_ID, "Я родился! ^___^ Причина: ты мя сейчас врубила и деплой окончен.");
})();
process
    .on('SIGINT', async () => {
        await bot.telegram.sendMessage(process.env.COVINOC_ID, "Я упал! Причина: ты мя вырубила.");
        await bot.telegram.sendMessage(process.env.COVINOC_BUNKER_ID, "Я упал! Причина: ты мя вырубила.");
        await bot.telegram.deleteWebhook();
        bot.stop('SIGINT');
    })
    .on('SIGTERM', async () => {
        await bot.telegram.sendMessage(process.env.COVINOC_ID, `Я упал! Ищи причину в ошибке с API.`);
        await bot.telegram.sendMessage(process.env.COVINOC_BUNKER_ID, `Я упал! Ищи причину в ошибке с API.`);
        await bot.telegram.deleteWebhook();
        bot.stop('SIGTERM');
    });