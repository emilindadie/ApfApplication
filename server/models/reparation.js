

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require("../models/user");
const Fresenius = require("../models/fresenius");
const Piece = require("../models/piece");

const reparationsSchema = new Schema({
    reparation_date: {
        type: Date,
		default: Date.now
    },
    reparateur: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    fresenius: {
        type: Schema.ObjectId,
        ref: 'Fresenius'
    },
    piece: [{
        type: Schema.ObjectId,
        ref: 'Piece'
    }]
});

module.exports = mongoose.model('Reparation', reparationsSchema);
