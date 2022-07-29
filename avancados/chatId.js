const env = require('dotenv').config().parsed;
const Telegraf = require('telegraf')
const bot = new Telegraf(env['TOKEN'])

bot.start(ctx => {
    console.log(ctx.chat.id === ctx.update.message.from.id)
})

bot.startPolling();