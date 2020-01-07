const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    'shortUrl' : {
        type : String,
        unique : true,
        required: true
    },
    'longUrl' : {
        type : String,
        unique : true,
        require :true
    }
});
const model = mongoose.model("Url", urlSchema);

module.exports = model;