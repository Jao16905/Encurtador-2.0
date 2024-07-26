const User = require("../models/User");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
    register: async function (req,res){

        const selectedUser = await User.findOne({email: req.body.email});
        if(selectedUser) return res.status(400).send("Email já existe")

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcript.hashSync(req.body.password)
        })

        try{
            await user.save();
            const token = jwt.sign({id: selectedUser._id, name:selectedUser.name, email: selectedUser.email}, process.env.TOKEN_SECRET, {expiresIn: 3600});

            res.header("authorization-token", token);
            res.send("User Logged");
        }catch(error){
            res.status(400).send(error)
        }
    },
    login: async function (req,res){

        const selectedUser = await User.findOne({email: req.body.email});
        if(!selectedUser) return res.status(400).send("Email ou senha incorretos!")

        const passwordAndUserMatch = bcript.compareSync(req.body.password, selectedUser.password);  

        if(!passwordAndUserMatch) return res.status(400).send("Email or password incorrect!")

        const token = jwt.sign({id: selectedUser._id, name:selectedUser.name, email: selectedUser.email}, process.env.TOKEN_SECRET, {expiresIn: 3600});

        res.header("authorization-token", token);
        res.send("User Logged");

    }
}

module.exports = userController