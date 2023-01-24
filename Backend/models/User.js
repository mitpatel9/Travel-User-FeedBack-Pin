const mongoose = require('mongoose');

//create user schema

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        min: 6
    },
    password: {
        type: String,
        min: 8
    },

},
    { timestamps: true },
);

module.exports=mongoose.model('User',UserSchema);

