const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const linkRoutes = require('./src/routes/linkRoutes');
const userRoutes = require('./src/routes/userRoutes');
const loginRoutes = require("./src/routes/loginRoutes")
const app = express();

mongoose.connect(process.env.MONGO_CONNECTION_URI);

const db = mongoose.connection;

app.use("/", linkRoutes);

app.use("/auth", loginRoutes);

app.use("/user", userRoutes);

app.use("/", express.static(path.join(__dirname, 'public')));

app.use("/", express.static(path.join(__dirname, 'public/pages')))

db.once('open', () =>{app.listen(process.env.PORT, () =>{
    console.log("Server oppened on port", process.env.PORT)
})});


