require('dotenv').config()
const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bot = require('./app/message/bot')
const moment = require('moment')
const date = moment().format('L h:mm:ss')

const port = process.env.PORT || 5000;

//static folder and files
app.use(express.static('public'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//init socket io

io.on("connection", (socket) => {

	//init whatsapp api baileys
	bot.start(socket)
})

server.listen(port, () => {
  console.log(`[ ✔ ] ${date} Server running on port : http://localhost:${port}`);
});


