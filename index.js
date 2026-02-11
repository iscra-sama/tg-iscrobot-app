const TelegramAPI = require("node-telegram-bot-api");
require("dotenv").config();
const consts = require("./iscromodules/consts");

const bot = new TelegramAPI(process.env.TOKEN, {webHook: true});
bot.on("message", async msg => {
    if (msg.from.id === consts.ISCRA_ID && msg.chat.id === consts.COVINOC_ID)
        try {
            await bot.deleteMessage(consts.COVINOC_ID, msg.message_id);
        }
        catch (error) {
            // dbg!
            console.error(error);
        }
});
bot.on("polling_error", err => {
    console.log(err.code);
})
bot.on("webhook_error", err => {
    console.log(err.code);
})