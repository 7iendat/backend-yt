const express = require("express");
const connectDB = require("./src/config/connectDB");
const configViewEngine = require("./src/config/viewEngine");
const bodyParser = require("body-parser");
const userRoute = require("./src/routes/music")
const playlistRoute = require("./src/routes/playlist")

require("dotenv").config();
const db = require("./src/models");
const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// start route
app.use(userRoute)
app.use(playlistRoute)
// end router


const PORT = process.env.PORT || 5000;

configViewEngine(app);

//Connect db (mysql)
connectDB();

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING  ON PORT ", PORT);
});

// module.exports = { app }
