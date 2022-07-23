const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const session = require('telegraf/session');
const env = require('dotenv').config().parsed;

const bot = new Telegraf(env['TOKEN'])

let lista = []

const botoes = () => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`)), 
        { columns: 3 }
    )
)


bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${name}!`)
    await ctx.reply('Escreva os itens que você deseja adicionar...')
})

bot.on('text', ctx => {
    let item = ctx.update.message.text
    lista.push(item)
    ctx.reply(`${item} adicionado!`, botoes())
})

bot.action(/delete (.+)/, ctx => {
    lista = lista.filter(item => item !== ctx.match[1])
    ctx.reply(`${ctx.match[1]} deletado!`, botoes())
})

bot.startPolling()