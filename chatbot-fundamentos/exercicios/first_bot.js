const Telegraf = require('telegraf');
const env = require('dotenv').config().parsed;

const bot = new Telegraf(env['TOKEN'])

bot.start(ctx => {
    const from = ctx.update.message.from;
    if(from.first_name == 'Pedro') ctx.reply(`Opa chefe!`)
    ctx.reply(`Seja bem vindo ${from.first_name}!`)
    console.log(from)
});

bot.on('text', async(ctx, next) => {
    ctx.reply('Vai se ferrar');
    next()
});

bot.startPolling();