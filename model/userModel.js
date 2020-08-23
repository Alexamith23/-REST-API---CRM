const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    nombre: { type: String },
    apellido: { type: String },
    usuario: { type: String },
    clave: { type: String },
    administrador: { type: Boolean }
  });

  module.exports = mongoose.model('users', user);