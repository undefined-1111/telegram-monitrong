const mongoose = require("mongoose")
const schema = mongoose.Schema({
    title: String,
    avatarURL: String,
    description: String,
    nickname: String,
    id: Number,
    fulldescription: String,
    rest: Number,
    learning: Number,
    administration: Number,
    music: Number,
});

module.exports = mongoose.model("Nado", schema)