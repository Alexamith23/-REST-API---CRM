const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    nombre: { type: String },
    apellido: { type: String },
    usuario: { type: String },
    clave: { type: String }
  });

  module.exports = mongoose.model('users', user);