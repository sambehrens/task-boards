const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const collaboratorSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        boardId: {
            type: ObjectId,
            required: [true, 'Board id is required']
        }
    },
    { timestamps: true }
);

module.exports = collaboratorSchema;
