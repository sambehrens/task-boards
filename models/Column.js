const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const columnSchema = new Schema(
    {
        boardId: {
            type: ObjectId,
            required: [true, 'Board id is required']
        },
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        taskIds: {
            type: [ObjectId]
        }
    },
    { timestamps: true }
);

module.exports = columnSchema;
