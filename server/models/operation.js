const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const operationSchema = new Schema({
    operation_name: String,
    date: String,
    operation_date: {type : Date,
    default: Date.now},
    operator_name: String,
    content: String,
});

module.exports = mongoose.model('Operation', operationSchema);