const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cliente = new Schema({
  user: { type: String },
  nombre: { type: String },
  ced_juridica: { type: String },
  pagina_web: { type: String },
  direccion: { type: String },
  telefono: { type: String },
  sector: { type: String },
});

module.exports = mongoose.model("clientes", cliente);
