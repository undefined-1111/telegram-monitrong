const { Telegraf } = require('telegraf')
const mongoose = require("mongoose")
const db = require("./models/bot.js")
mongoose.connect(require("./config.json").db, {useNewUrlParser: true, useUnifiedTopology: true})

const bot = new Telegraf("1625983751:AAHedBt9yn6FQKkxz0VtzuRBbR_IxS_2fvA")
bot.command('start', (ctx) => ctx.reply('/create||(Заголовок бота)||(@bot)||(Короткое описание бота)||# Длинное описание бота||Ссылка на аватарку вашего бота||1/1/1/1 (Остальное, Обучение, Администрация, Музыка) \n\n1 Бот являеться\0 Бот не являеться\nТак вы можете взять ссылку аватара через бота @tlgurbot (Данный бот не имеет отношения к нашему боту!)\n|| = Разделитель\nТак же длинное описание поддерживает Markdown, если кто то не знает как им пользоваться вот вам ссылка почитать -> https://guides.hexlet.io/markdown/'))
bot.command('create', async(ctx) => {
    let args = ctx.message.text.split("||").slice(1)
    let tags = args[5].split("/")
    if(args.size < 5) return ctx.reply("Что то вы неправильно написали...")
    db.countDocuments({}, async(err,c) => {
        c++
        console.log(args)
        await db.create({
            id: Number(c),
            title: args[0],
            nickname: args[1],
            description: args[2],
            fulldescription: args[3],
            avatarURL: args[4],
            rest: tags[0],
            learning: tags[1],
            administration: tags[2],
            music: tags[3]
        })
    })
    ctx.reply("Готово, проверяй))")
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))