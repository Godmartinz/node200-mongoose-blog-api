const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');


mongoose.connect('mongodb://test:tester1@ds139956.mlab.com:39956/heroku_53ft6v4n',{ useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.Promise = Promise;

const app = express();


app.use(bodyParser.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req,res) => {
    res.status(200).send();
});



module.exports = app;