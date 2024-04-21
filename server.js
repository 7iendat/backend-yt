const express = require("express");
const connectDB = require("./src/config/connectDB");
const configViewEngine = require("./src/config/viewEngine");
const bodyParser = require("body-parser");
const userRoute = require("./src/routes/music")

require("dotenv").config();
const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(userRoute)


const PORT = process.env.PORT || 5000;

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect db (mysql)
connectDB();

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING  ON PORT ", PORT);
});

// module.exports = { app }
