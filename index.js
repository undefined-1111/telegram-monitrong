const express = require("express")
const app = express()
const mongoose = require("mongoose")
const config = require("./config.json")
const bot = require("./models/bot.js")

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function main(req, res, toadding, filename, limit) {
  let page = req.query.page

  if(!page) page = 1

  let startindex = (page-1) * limit
  let endindex = page * limit

  // console.log(toadding)
  console.log(toadding.length)
  console.log(startindex)
  if(startindex == toadding.length) return res.render("emptypageorsearch.ejs")

  let codetoadding = ``
  try {
    for(let i = startindex; i < endindex; i++) {
      // console.log(i)
      codetoadding += `<div class="card w-full border-2 border-indigo-600 rounded-lg p-14">
      <img class="items-center h-24 w-24 rounded-full mx-auto" style="background: url(${toadding[i].avatarURL}); background-size: cover;">
      <p class="other text-center text-3xl mt-3 font-black">
          ${toadding[i].title}
      </p>
      <p class="text-center mt-2">${toadding[i].description}</p>
      <div class="flex mt-8">
          <div class="w-full border-2 border-indigo-700 p-2 rounded-lg hover:text-white hover:bg-indigo-700">
              <a href="/viewbot?id=${toadding[i].id}" class="text-center">${toadding[i].nickname}</a>
          </div>
      </div>
  </div>`
    } 
  } catch(err) {
    res.render(filename, {
      code: codetoadding
    })
  }

  res.render(filename, {
    code: codetoadding
  })
}

app.get("/", async(req,res) => {
  let toadding = await bot.find()
  main(req, res, toadding, "index.ejs", 10)
})

app.get("/rest", async(req,res) => {
  let toadding = await bot.find({rest:1})
  main(req, res, toadding, "without.ejs", 99999)
})

app.get("/music", async(req,res) => {
  let toadding = await bot.find({music:1})
  main(req, res, toadding, "without.ejs", 99999)
})

app.get("/administration", async(req,res) => {
  let toadding = await bot.find({administration:1})
  main(req, res, toadding, "without.ejs", 99999)
})

app.get("/learning", async(req,res) => {
  let toadding = await bot.find({learning:1})
  main(req, res, toadding, "without.ejs", 99999)
})

app.get("/search", async(req,res) => {
  let toadding = await bot.find({
    title: req.query.searching
  })
  console.log(toadding)
  console.log(req.query.searching)
  if(toadding.size < 1) {
    res.render("emptypageorsearch.ejs")
    return
  }
  main(req, res, toadding, "without.ejs", 99999)
})



app.get("/viewbot", async(req,res) => {
  if(!req.query.id) return res.redirect("/")
  let idshnik = req.query.id
  let markdown = require( "markdown" ).markdown;
  let find = await bot.findOne({
    id: idshnik
  })
  let descriptioninmark = markdown.toHTML(find.fulldescription)
  res.render("viewbot.ejs", {
    mark: descriptioninmark,
    name: find.title,
    description: find.description,
    nickname: find.nickname,
    avatar: find.avatarURL
  })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("started")
})
