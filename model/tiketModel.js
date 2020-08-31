const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tiket = new Schema({
  titulo: { type: String },
  detalle: { type: String },
  reporta: { type: String },
  cliente: { type: String },
  estado: { type: String },
  usuario_id:{type: String }
});

module.exports = mongoose.model("tikets", tiket);
