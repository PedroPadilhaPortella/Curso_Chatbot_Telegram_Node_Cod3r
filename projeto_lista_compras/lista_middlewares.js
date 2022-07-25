const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const session = require('telegraf/session');
const env = require('dotenv').config().parsed;

const bot = new Telegraf(env['TOKEN']);

const botoes = lista => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`)), {
            columns: 3
        }
    )
);

const checkUser = (ctx, next) => {
    const sameId = ctx.update.message && ctx.update.message.from.id == env['USER_ID'];
    const sameIdFromCb = ctx.update.callback_query && ctx.update.callback_query.from.id == env['USER_ID'];

    if(sameId || sameIdFromCb) {
        next();
    } else {
        ctx.reply(`Desculpe, mas não fui autorizado a interagir com você!,`);
        ctx.reply(env['USER_ID']);
        ctx.reply(ctx.update.message.from.id);
    }
}

const processing = (ctx, next) => {
    ctx.reply('processando...').then(() => next());
}

bot.use(session());

bot.start(checkUser, processing, async (ctx) => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${name}!`)
    await ctx.reply('Escreva os itens que você deseja adicionar...')
    ctx.session.lista = ctx.session.lista || [];
});

bot.on('text', ctx => {
    let msg = ctx.update.message.text
    ctx.session.lista.push(msg)
    ctx.reply(`${msg} adicionado!`, botoes(ctx.session.lista))
});

bot.action(/delete (.+)/, ctx => {
    ctx.session.lista = ctx.session.lista.filter(
        item => item !== ctx.match[1])
    ctx.reply(`${ctx.match[1]} deletado!`, botoes(ctx.session.lista))
});

bot.startPolling();