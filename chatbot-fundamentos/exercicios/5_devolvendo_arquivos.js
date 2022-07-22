const Telegraf = require('telegraf');
const axios = require('axios');
const env = require('dotenv').config().parsed;

const bot = new Telegraf(env['TOKEN'])

bot.start(async ctx => {
    ctx.reply('Ok');
})

bot.on('voice', async ctx => {
    const id = ctx.update.message.voice.file_id
    const res = await axios.get(`${env['API_URL']}/getFile?file_id=${id}`)
    ctx.replyWithVoice({ url: `${env['API_FILE_URL']}/${res.data.result.file_path}`})
})

bot.on('photo', async ctx => {
    const id = ctx.update.message.photo[0].file_id
    const res = await axios.get(`${env['API_URL']}/getFile?file_id=${id}`)
    ctx.replyWithPhoto({ url: `${env['API_FILE_URL']}/${res.data.result.file_path}`})
})

bot.startPolling();