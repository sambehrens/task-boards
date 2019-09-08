const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new Schema(
    {
        boardId: {
            type: ObjectId,
            required: [true, 'Board id is required']
        },
        name: {
            type: String,
            required: [true, 'Task name is required']
        },
        number: {
            type: Number
        },
        description: {
            type: String
        },
        estimate: {
            type: Number
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
