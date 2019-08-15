const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const winston = require('./src/config/winston');
const morgan = require('morgan');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(morgan('combined', { stream: winston.stream }));

mongoose.connect('mongodb+srv://dbUser:dmH1TejXfX7wJZ0H@cluster0-xosr0.mongodb.net/instagram?retryWrites=true&w=majority',{
    useNewUrlParser: true
})

app.use((req, res, next) =>{
    req.io = io;

    next();
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, 'uploads', 'resized')))

app.use(require('./src/routes'));

const PORT = 3000;

const HOST = '0.0.0.0';

server.listen(PORT,HOST);

app.get('/', (req, res)=>{
    res.send('HELLO WOLD!')
})