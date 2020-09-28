const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new Schema(
    {
        boardId: {
            type: ObjectId,
            required: [true, 'Board id is required']
        },
        number: {
            type: Number
        },
        description: {
            type: String,
            required: [true, 'Task description is required']
        },
        assignee: {
            type: ObjectId
        },
        createdBy: {
            type: ObjectId
        }
    },
    { timestamps: true }
);

module.exports = taskSchema;
