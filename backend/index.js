const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const customers = io.of('/customer');
const operators = io.of('/operator');
const path = require('path');
const Inquiry = require('./DB/inquiry');



/**************SERVER***************/

const port = 4000;

server.listen(port, () => {
  console.log(`Server is running http://127.0.0.1:${port}`);
});

app.get('/', (req, res) => {
  res.redirect('/shop/');
});

app.get('/shop/', (req, res) => {
  res.sendFile(path.join(__dirname + '/shop/index.html'));
});

app.get('/oppanel/', (req, res) => {
  res.sendFile(path.join(__dirname + '/oppanel/index.html'));
});

/**************WEBSOCKET***************/

customers.on('connection', (socket) => {
  console.log('customer connected');
  socket.emit('greeting', { hello: 'customer' });
  socket.on('addNewInquiry', (data) => {
    console.log(data);
  });
});

operators.on('connection', (socket) => {
  console.log('operator connected');
  socket.emit('gretting', { hello: 'operator' });
});
