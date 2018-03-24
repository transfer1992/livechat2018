
const mongoose = require('mongoose');

mongoose.connect('mongodb://veronika:password@ds153003.mlab.com:53003/template');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error:'));

db.once('open', () => {
    console.log("Database is connected!");
});



var inquirySchema = new mongoose.Schema({
    clientId : {type: String},
    consultantId : {type: String},
    category : {type: String},
    message : {type: String},
    // date : Date,
    status : {type: String , enum: ['open', 'closed', 'rejected', 'inProgress']}
}) ;

// inquirySchema.pre('save', (next) => {
//     // !this.date ? this.date = new Date : null;
//     next();
// });

const Inquiry = mongoose.model('inquiry', inquirySchema);

addNewInquiry = function(clientId, consultantId, category, message, status){
    let newInquiry = new Inquiry({
        clientId : clientId,
        consultantId : consultantId,
        category : category,
        message : message,
        status : status
    });

    db.inquires.insert({a:"a"});
    // newInquiry.save((err) => {
    //     if (err) throw err;
    //     console.info(`error: ${err}`);
    // });
};







module.exports = Inquiry;