const Author = require('../models/Author');

// Crear autor (POST)
exports.createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json({ success: true, data: author });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Leer todos los autores (GET)
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json({ success: true, count: authors.length, data: authors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Leer autor por ID (GET)
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ success: false, error: 'Autor no encontrado' });
    res.status(200).json({ success: true, data: author });
  } catch (error) {
    res.status(400).json({ success: false, error: 'ID de autor inválido' });
  }
};
