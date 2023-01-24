const mongoose = require('mongoose');

//create Pin schema

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    tital: {
        type: String,
        required: true,
        min:3
    },
    desc: {
        type: String,
        required: true,
        min: 3
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max:5
    },
    lat: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    },

},
    { timestamps: true },
);

module.exports=mongoose.model('Pin',PinSchema);

