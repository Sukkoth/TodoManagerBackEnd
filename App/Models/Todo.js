const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'title required'],
            trim: true,
        },
        reminder: {
            type: Date,
            default: null,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Todo', todoSchema);
