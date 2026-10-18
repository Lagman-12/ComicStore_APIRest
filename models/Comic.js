const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  anioPublicacion: { type: Number, required: true },
  editorial: { type: String, required: true },
  sinopsis: { type: String },
  generos: [{ type: String }],
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  precio: { type: Number, default: 50000 },
  stock: { type: Number, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Comic', comicSchema, 'Comics');
