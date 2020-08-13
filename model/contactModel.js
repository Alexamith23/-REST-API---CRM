const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema({
  client: { type: String },
  nombre: { type: String },
  apellido: { type: String },
  correo: { type: String },
  telefono: { type: String },
  puesto: { type: String }
});

module.exports = mongoose.model("contacts", contact);
