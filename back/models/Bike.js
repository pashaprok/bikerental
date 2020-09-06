const mongoose = require('mongoose');

const BikeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    isRented: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('Bikes', BikeSchema); 