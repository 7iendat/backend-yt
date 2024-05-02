const express = require("express");
const connectDB = require("./src/config/connectDB");
const configViewEngine = require("./src/config/viewEngine");
const bodyParser = require("body-parser");
// const userRoute = require("./src/routes/music");
// const playlistRoute = require("./src/routes/playlist");
var cors = require("cors");
const initUserRoutes = require("./src/routes/user");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // allow subdomains
  })
);
// start route
// app.use(userRoute);
// app.use(playlistRoute);

initUserRoutes(app);

const PORT = process.env.PORT || 5000;

configViewEngine(app);

//Connect db (mysql)
connectDB();

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING  ON PORT ", PORT);
});

// module.exports = { app }
