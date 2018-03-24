const app = require('express')();
const mongoose = require('mongoose');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const customers = io.of('/customer');
const operators = io.of('/operator');
const path = require('path');


/**************DBA****************/

var mongoDB = 'mongodb://veronika:password@ds153003.mlab.com:53003/template';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log("Database is connected!");
});

var Schema = mongoose.Schema;

var inquirySchema = new Schema({
    email: { type: String },
    name: {type: String},
    consultantId: { type: String },
    category: { type: String },
    message: { type: String },
    date: Date,
    status: { type: String, enum: ['open', 'closed', 'rejected', 'inProgress'] }
});

const Inquiry = mongoose.model('inquiry', inquirySchema);

addNewInquiry = function (data) {
    tmpInquiry = {
        email: data.email,
        name: data.name,
        consultantId: data.consultantId,
        category: data.category,
        message: data.message,
        date: Date.now(),
        status: data.status
    }

    new Inquiry(tmpInquiry)
        .save()
        .then()
        .catch((e) => {
            console.log(`error: ${e}`);
        });
};

getAllInquires = function () {
  return Inquiry.find({})
  .then((inquiriesArray) => {

      return inquiriesArray;
  })
}

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
    addNewInquiry(data);
    console.log(data);
  });
});

operators.on('connection', (socket) => {
  getAllInquires();
  console.log('operator connected');
  socket.emit('gretting', { hello: 'operator' });
});

operators.on('addNewInquiry',(data))
