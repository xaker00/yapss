const { model } = require('mongoose');
const User = require('./User');
const photoSchema = require('./Photo');

const Photo = model('Book', photoSchema);


module.exports = { User, Book: Photo };
