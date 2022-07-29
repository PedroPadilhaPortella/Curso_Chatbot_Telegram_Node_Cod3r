const env = require('dotenv').config().parsed;
const Telegram = require('telegraf/telegram');
const axios = require('axios');
const Markup = require('telegraf/markup');

const enviarMensagem = msg => {
    axios.get(`${env.apiUrl}/sendMessage?chat_id=${env.userID}&text=${encodeURI(msg)}`)
        .catch(e => console.log(e))
}

enviarMensagem('Enviando a mensagem de forma assíncrona');

const teclado = Markup.keyboard([
    ['Ok', 'Cancelar'],
]).resize().oneTime().extra();

const telegram = new Telegram(env['TOKEN']);

telegram.sendMessage(env['USER_ID'], 'Essa é uma mensagem com teclado', teclado);