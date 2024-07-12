const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const linkRoutes = require('./src/routes/linkRoutes');
const userRoutes = require('./src/routes/userRoutes');
const app = express();

mongoose.connect("mongodb://localhost:27017/encurtador");

const db = mongoose.connection;

app.use("/", linkRoutes);

app.use("/user/:username", userRoutes)

app.use("/", express.static(path.join(__dirname, 'public')))

db.once('open', () =>{app.listen(process.env.PORT, () =>{
    console.log("Server oppened on port", process.env.PORT)
})});


