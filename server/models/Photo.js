const { Schema } = require('mongoose');

const photoSchema = new Schema({
  photoId: {
    type: String,
    required: true,
  },
  // add other fields here
});

module.exports = photoSchema;
