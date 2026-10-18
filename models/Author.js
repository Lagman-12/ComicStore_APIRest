const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String },
  nombreArtistico: { type: String },
  nacionalidad: { type: String, required: true },
  fechaNacimiento: { type: String },
  fechaFallecimiento: { type: String },
  biografia: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema, 'Autores');