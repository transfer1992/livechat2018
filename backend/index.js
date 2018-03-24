const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://veronika:password@ds153003.mlab.com:53003/template');
const app = express();


app.listen(5000, () => {
    console.log('Server is running http://127.0.0.1:5000');
  });