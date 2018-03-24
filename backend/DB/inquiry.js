//Import the mongoose module
var mongoose = require('mongoose');
const customers = io.of('/customer');
const operators = io.of('/operator');

//Set up default mongoose connection
var mongoDB = 'mongodb://veronika:password@ds153003.mlab.com:53003/template';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
    console.log("Database is connected!");
});

var Schema = mongoose.Schema;

var inquirySchema = new Schema({
    clientId: { type: String },
    consultantId: { type: String },
    category: { type: String },
    message: { type: String },
    date: Date,
    status: { type: String, enum: ['open', 'closed', 'rejected', 'inProgress'] }
});


// Compile model from schema
const Inquiry = mongoose.model('inquiry', inquirySchema);

addNewInquiry = function (data) {
    tmpInquiry = {
        clientId: data.clientId,
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

getInquireById = function (id) {
    Inquiry.find({_id : id})
    .then((inquiry) => {
        return inquiry;
    })
}

getInquiresByConsultandId = function (consultantId) {
    Inquiry.find({consultantId : consultantId})
    .then((inquiry) => {
        console.log(inquiry)
        return inquiry;
    })
}

getInquireById("5ab6746605de087b495d0c64");

getInquiresByConsultandId("dupa");


module.exports = Inquiry;