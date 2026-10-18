const Comic = require('../models/Comic');

// Crear cómic (POST)
exports.createComic = async (req, res) => {
  try {
    const comic = new Comic(req.body);
    await comic.save();
    res.status(201).json({ success: true, data: comic });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Leer todos los cómics incluyendo la información poblada del autor (GET)
exports.getComics = async (req, res) => {
  try {
    const comics = await Comic.find().populate('autor');
    res.status(200).json({ success: true, count: comics.length, data: comics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Leer cómic por ID (GET)
exports.getComicById = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id).populate('autor');
    if (!comic) return res.status(404).json({ success: false, error: 'Cómic no encontrado' });
    res.status(200).json({ success: true, data: comic });
  } catch (error) {
    res.status(400).json({ success: false, error: 'ID de cómic inválido' });
  }
};
