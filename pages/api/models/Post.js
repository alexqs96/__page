const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        email : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        text : {
            type: String,
            required: true,
        },
        image : {
            type: String,
            default: '',
        }
    }
    ,
    {
        timestamps: true
    }
);

module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);