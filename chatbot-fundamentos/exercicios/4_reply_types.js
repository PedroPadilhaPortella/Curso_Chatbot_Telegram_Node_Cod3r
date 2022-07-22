const Telegraf = require('telegraf');
const env = require('dotenv').config().parsed;

const bot = new Telegraf(env['TOKEN'])

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name;

    await ctx.reply(`Seja bem vindo ${name}!`);

    await ctx.replyWithHTML(`Destacando <b>mensagem</b> de 
    <i>várias</i> <code>formas</code> <pre>possíveis</pre> <a href="www.google.com">Google</a>`);

    await ctx.replyWithMarkdown(`Destacando com MarkDown [Google](http://www.google.com)`);

    await ctx.replyWithPhoto({ source: `${__dirname}/ak.jpg`});
    await ctx.replyWithPhoto('https://osasco.sp.gov.br/wp-content/uploads/2022/05/1k1a0509_ccexpress.jpeg', 
        { caption: 'Olha que fofo!'}
    );
    await ctx.replyWithPhoto(
        {url: 'https://osasco.sp.gov.br/wp-content/uploads/2022/05/1k1a0509_ccexpress.jpeg' }
    );

    await ctx.replyWithLocation(29.9, 31.1);

    await ctx.replyWithVideo('http://files.cod3r.com.br/curso-bot/cod3r-end.m4v');
});

bot.startPolling();