//importing express and initializing it.
const express = require("express");
const app = express();

//Importing Packages.
const indexRouter = require("./routes/indexRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const productsRouter = require("./routes/productsRouter.js");
const ownersRouter = require("./routes/ownersRouter.js");
const db = require("./config/mongooseCreation.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const cookieParser = require("cookie-parser");

require("dotenv").config();
//Setting Middlewares.
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Or true, depending on your needs
    cookie: { secure: true, httpOnly: true },
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes.

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/owners", ownersRouter);

app.listen(3000, (err) => {
  if (err) {
    console.log("An erro occured while listning the server");
  }
  console.log("Server is running successfully");
});
