const mongoose = require('mongoose')

const taskschema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taskImage: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
},
    {timestamps: true}
)

module.exports = mongoose.model('Task', taskschema)