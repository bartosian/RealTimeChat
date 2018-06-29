"use strict";

const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const passport = require('passport');
const { Strategy } = require('passport-jwt');

const { jwt } = require('./config');

passport.use(new Strategy(jwt, function(jwt_payload, done) {
    if(jwt_payload != void(0)) return done(false, jwt_payload);
    done();
}));

mongoose.connect('mongodb://localhost:27017/realtimechat');
mongoose.Promise = require('bluebird');
mongoose.set('debug', true);

nunjucks.configure('./client/views', {
    autoescape: true,
    express: app
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length,Content-Range');
    next();
});

app.use(express.static(path.join(__dirname, '../', 'RealChatClient', 'build')));

app.get('*', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'RealChatClient', 'build', 'index.html'));
});

require('./router')(app);

require('./sockets')(io);

server.listen(7777, () => {
    console.log('Server started on port 7777');
});