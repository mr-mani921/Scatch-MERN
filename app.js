//importing express and initializing it.
const express = require('express');
const app = express();

//Importing Packages.
const usersRouter = require('./routes/usersRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const ownersRouter = require('./routes/ownersRouter.js');
const db = require('./config/mongooseCreation.js');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

//Setting Middlewares.
app.set('view engine','ejs');
// app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

//Routes.
app.use('/users',usersRouter);
app.use('/products',productsRouter);
app.use('/owners',ownersRouter);

app.listen(3000,(err)=> {
    if(err) {
        console.log('An erro occured while listning the server');
    }
    console.log('Server is running successfully');
    
}); 