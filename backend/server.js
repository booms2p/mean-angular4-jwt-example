﻿require('rootpath')();
var express = require('express');
var app = express();

var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

var items = require('./models/itemModels.js');
mongoose = require('mongoose'),
    mongoose.Promise = global.Promise;
mongoose.connect(config.connectionString);

app.use(cors());
// app.use(bodyParser.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(expressJwt({ secret: config.secret }).unless({ path: ['/users/authenticate', '/users/register'] }));

// routes
app.use('/users', require('./controllers/users.controller'));
app.use('/items', require('./controllers/items.controller'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function() {
    console.log('Server listening on port ' + port);
});