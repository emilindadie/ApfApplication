const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//const Piece = require("../models/piece");

const freseniusSchema = new Schema({
    client_name: String,
    bill_point: String,
    deliver_point: String,
    client_code_number: String,
    sap_order_number: String,
    receipt_date: String,
    fresenius_date:String,
    fresenius_type: String,
    device_number :String,
    product_code: String,
    bio_number:String,
    entry_number: String,
    declared_defect: String,
    defect_found: String,
    interventionLine1: String,
    interventionLine2: String,
    interventionLine3: String,
    past_time: String,
    status: {
        type: String,
        required: true,
        default: 'test non validé'
    },
    piece: [{
        type: Schema.ObjectId,
        ref: 'Piece'
    }],
    reparateur: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    test_validation_date: String,
    test_validator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    send_validation_date: String,
    send_validator:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    last_modificator:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    last_modification_date : String
});

module.exports = mongoose.model('Fresenius', freseniusSchema);