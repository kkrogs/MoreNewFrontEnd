const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const memorySchema = new Schema({
  memoryText: {
    type: String,
    required: 'You need to leave a memory!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  memoryAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Memory = model('Memory', memorySchema);

module.exports = Memory;
