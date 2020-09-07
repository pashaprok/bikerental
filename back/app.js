const express = require('express');
const app = express();
var path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = 3443;

//this information is hidden in a real project
const DB_CONNECTION = 'mongodb+srv://testappuser2020:testappuser2020@cluster0.o544d.mongodb.net/db?retryWrites=true&w=majority';

//imports routes
const bikesRoute = require('./routes/bikes');

//middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bikes', bikesRoute);

//routes
app.get('/', (req, res) => {
    res.send('we are on home.');
})

//connect to db
mongoose.connect(
    DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to db!')
);

//listening to the server 
app.listen(PORT);