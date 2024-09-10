/*
Author: M.Usman Raza
Date: 8/9/2024.
*/

//The numbers written in the end of some lines indicate the line number of code explaination in "codeExplaination.md". You can go and preview the "explaination.md" for the explaination of the lines.

//importing express and initializing it.
const express = require("express");
const app = express();

//Importing Packages.
const indexRouter = require("./routes/indexRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const productsRouter = require("./routes/productsRouter.js");
const ownersRouter = require("./routes/ownersRouter.js");
const db = require("./config/mongooseCreation.js");
const session = require("express-session"); //                  (1)
const flash = require("connect-flash"); //                      (2)

const path = require("path");
const cookieParser = require("cookie-parser");

//Setting Middlewares.
require('dotenv').config();

//Sare middlewares un sb files or routes k lye bhi available hon ge jo app.js se ho kr guzarte haen.

app.set("view engine", "ejs"); //                               (3)
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public"))); //     (4)
app.use(express.json()); //                                     (5)
app.use(express.urlencoded({ extended: true })); //             (6)
app.use(cookieParser()); //                                     (7)

//Routes.

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/owners", ownersRouter);

app.listen(3000, (err) => {
  if (err) {
    console.log("An error occured while listning the server" + err);
  }
  console.log("Server is running successfully");
});
