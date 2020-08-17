const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reunion = new Schema({
  titulo: { type: String },
  dia_hora: { type: String },
  usuario: { type: String },
  virtual: { type: Boolean }
});

module.exports = mongoose.model("reuniones", reunion);
