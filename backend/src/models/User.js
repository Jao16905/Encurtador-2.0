const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String, require: true, minlength:3, maxlentgh:50, required: true},
    email:{type:String, require: true, minlength:3, maxlentgh:50, required:true},
    password:{type:String, require: true, minlength:6, maxlentgh:50, required: true},

})

module.exports = mongoose.model("User", userSchema);