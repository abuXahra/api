const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({

    comment: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        require: false
    },

    userphoto: {
        type: String,
        require: true
    },


},
    { timestamps: true })


module.exports = mongoose.model('Comment', commentSchema);