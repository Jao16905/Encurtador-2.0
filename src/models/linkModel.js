const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    URL: {type: String, required: true},
    newURL: {type:String, default: ""},
    title: {type:String, default:""},
    used: {type:Boolean, default: false},
    count: {type: Number, default: 0},
    limit: {type: Number, default: 0}
})

module.exports = mongoose.model("Link", linkSchema)