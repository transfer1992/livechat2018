//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://veronika:password@ds153003.mlab.com:53003/template';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
    console.log("Database is connected!");
});




//Define a schema
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





addNewInquiry = function (clientId, consultantId, category, message, status) {
    tmpInquiry = {
        clientId: clientId,
        consultantId: consultantId,
        category: category,
        message: message,
        date: Date.now(),
        status: status
    }

    new Inquiry(tmpInquiry)
        .save()
        .then((inquiry) => {
            console.log(inquiry);
        })
        .catch((e) => {
            console.log(e);
        });
};

addNewInquiry("aaA", "bb", "cdc", "dd", "open");

setTimeout(() => {
    Inquiry.find({})
    .then((ideas) => {
        console.log(ideas);
    });
}, 3000);




module.exports = Inquiry;