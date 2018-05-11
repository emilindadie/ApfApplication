const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockPieceSchema = new Schema({
    reference_name: {
        type : String,
        required: true
    },
    createdDate : { type : Date, 
        default : Date.now()
    },
    lot_number : String,
    quantity: Number,
    min_quantity_level: Number,
    description: String, 
    complete : String
});

module.exports = mongoose.model('StockPiece', stockPieceSchema);