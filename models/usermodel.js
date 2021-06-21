const mongo = require('mongoose');
const Schema = mongo.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength:6
    }
})

exports.UserModel = mongo.model('Users', User);