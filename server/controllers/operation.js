const Operation = require('../models/operation');

module.exports = {
    all: (request, response) => {
        Operation.find({}).sort([['operation_date', -1]]).exec(function(err, operations) {
            if (err)
            {
                response.json(500, err);
            }
            if (operations) {
                response.json(operations);
            } 
        });
    }
}