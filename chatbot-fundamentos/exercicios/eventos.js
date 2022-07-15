const Telegraf = require('telegraf');
const env = require('dotenv').config().parsed;

const bot = new Telegraf(env['TOKEN'])

bot.start(ctx => {
    const name = ctx.update.message.from.first_name;
    ctx.reply(`Seja bem vindo ${name}!`)
});

bot.on('text', async(ctx) => {
    ctx.reply(`Você disse: '${ctx.update.message.text}'`);
});

bot.on('location', async(ctx) => {
    const location = ctx.update.message.location;
    console.log(location);
    ctx.reply(`Entendido, você está em: Lat${location.latitude} e Long ${location.longitude}`);
});

bot.on('contact', async(ctx) => {
    const contact = ctx.update.message.contact;
    console.log(contact);
    ctx.reply(`Vou lembrar do ${contact.first_name}, Tel:. ${contact.phone_number}`);
});

bot.on('voice', async(ctx) => {
    const voice = ctx.update.message.voice;
    console.log(voice);
    ctx.reply(`Seu audio tem ${voice.duration} segundos`);
});

bot.on('photo', async(ctx) => {
    const photo = ctx.update.message.photo;
    console.log(photo);
    photo.forEach((p, i) => {
        ctx.reply(`foto ${i} tem a resolução de ${p.height}px por ${p.width}px`);
    })
});

bot.on('sticker', async(ctx) => {
    const sticker = ctx.update.message.sticker;
    console.log(sticker);
    ctx.reply(`Estou vendo que você enviou o  ${sticker.emoji} do conjunto ${sticker.set_name}`);
});

bot.startPolling();