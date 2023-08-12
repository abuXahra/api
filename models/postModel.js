const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },

    desc: {
        type: String,
        required: true,

    },

    photo: {
        type: String,
        require: false
    },

    username: {
        type: String,
        require: true
    },

    categories: {
        type: Array,
        require: false
    },

    // comment: {
    //     type: Array,
    //     require: false
    // }

},
    { timestamps: true })


module.exports = mongoose.model('Post', postSchema);